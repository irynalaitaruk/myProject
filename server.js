const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const cors = require('cors');
const mysql = require('mysql');
const port = 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
//app.use(cors());

//MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vivtorok16'
});

// create table ITEMS
let initDb = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS items (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'price varchar(50),' +
        'image varchar(50),' +
        'brand_id int(11),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `name_UNIQUE` (`name` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS items')
        });
};

initDb();
// create table HATS
let initDb1 = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS hats (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'price varchar(50),' +
        'image varchar(50),' +
        'brand_id int(11),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `name_UNIQUE` (`name` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS hats')
        });
};

initDb1();
// create table BRAND
let initDb2 = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS brand (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `name_UNIQUE` (`name` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS brand')
        });
};

initDb2();
// create table USERS
let initDb3 = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS users (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'login varchar(50), ' +
        'password varchar(50),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `login_UNIQUE` (`login` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS users')
        });
};

initDb3();
// create table USERPAGE
let initDb4 = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS userpage (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'name varchar(50), ' +
        'sname varchar(50),' +
        'date varchar(50),' +
        'about varchar(50),' +
        'users_id int(11),' +
        'PRIMARY KEY(id), ' +
        'UNIQUE INDEX `name_UNIQUE` (`name` ASC))',
        function (err) {
            if (err) throw err;
            console.log('CREATE TABLE IF NOT EXISTS userpage')
        });
};

initDb4();


//Авторизація 
app.post('/login-auth', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            if (rows[0].password == req.body.password) {
                res.status(200).send("welcome");
            } else {
                res.status(200).send("wrong password");
            }
        } else {
            res.status(200).send("wrong login");
        }
    });
});

//Реєстрація
app.post('/login-reg', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            res.status(200).send("Choose another login!");
        } else {
            connection.query('INSERT INTO users SET ?', req.body,
                function (err, result) {
                    if (err) throw err;
                    console.log('user added to database with id: ' + result.insertId);

                }

            );
            res.status(200).send(req.body.login + " registered!");
        }
    });
});

//Завантажити дані авторизованого юзера
app.post('/user-prof', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            connection.query('SELECT * FROM userpage  WHERE users_id = ?', rows[0].id,
                function (err, result) {
                    if (err) throw err;
                    if (result[0] != undefined) {
                        res.status(200).send(result);
                    } else {
                        res.status(200).send("User profile is undefined");
                    }
                }
            );
        } else {
            res.status(200).send("User is undefined");
        }
    });
});



//get items
app.get('/items', function (req, res) {
connection.query('SELECT * FROM items', 
    function (err,rows) {
        if (err) throw err;
    console.log('get all itemses,length: ' + rows.length);

res.status(200).send(rows);
    });
});
//
//get hats
app.get('/hats', function (req, res) {
connection.query('SELECT * FROM hats', 
    function (err,rows) {
        if (err) throw err;
    console.log('get all hats,length: ' + rows.length);

res.status(200).send(rows);
    });
});
//



app.post('/brand-inf', function (req, res) {
    connection.query('SELECT * FROM brand  WHERE name = ?', req.body.name, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
             connection.query('SELECT * FROM items  WHERE brand_id = ?', rows[0].id,
                function (err, result) {
                    if (err) throw err;
                    res.status(200).send(result);
                }
            );
        } else {
            res.status(200).send("Brand is undefined");
        }
    });
});
//
app.post('/brandhat-inf', function (req, res) {
    connection.query('SELECT * FROM brand  WHERE name = ?', req.body.name, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
             connection.query('SELECT * FROM hats  WHERE brand_id = ?', rows[0].id,
                function (err, result) {
                    if (err) throw err;
                    res.status(200).send(result);
                }
            );
        } else {
            res.status(200).send("Brand is undefined");
        }
    });
});
//ngDialogBuyItems
app.post('/item-change', function (req, res) {
    connection.query('UPDATE items SET name = ?, price = ?', [req.body.name, req.body.price],
        function (err) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});

//ngDialogChangePassword
app.post('/pass-change', function (req, res) {
    connection.query('UPDATE users SET password = ? WHERE login = ?', [req.body.login,req.body.password],
        function (err) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});




//Усі адреси контролюються клієнтським ангуляром
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
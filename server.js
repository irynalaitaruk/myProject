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

//Авторизація 
app.post('/login', function (req, res) {
    connection.query('SELECT * FROM users  WHERE login = ?', req.body.login, function (err, rows) {
        if (err) throw err;
        if (rows[0] != undefined) {
            if (rows[0].password == req.body.pass) {
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
//            res.status(200).send(req.body.login+" registered!");
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
                    res.status(200).send(result);
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
//Усі адреси контролюються клієнтським ангуляром
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(cors());



  let arr = [{login:"user1",pass:"123"},
           {login:"user2",pass:"456"},
           {login:"user3",pass:"789"}];

//app.post('/login', function (req,res) {
//	
//	for(var a = 0; a <= arr.length; a++){
//		
//	if(req.body.login == arr[a].login){
//        
//        
//		if(req.body.pass == arr[a].pass){
//            
//			res.status(200).send("Welcome to site!");
//            
//		}else{
//			res.status(200).send("Wrong password");
//		}
//	}else{
//		res.status(200).send("Wrong login");
//	}
//}
//})

app.post('/login', function (req, res) {
    if (req.body.login == "admin") {
        if (req.body.pass == "123") {
            res.status(200).send("Wellcome to site!");
        } else {
            res.status(200).send("Wrong password!");
        }
    } else {
        res.status(200).send("Wrong login!");
    }
})


//Усі адреси контролюються клієнтським ангуляром
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
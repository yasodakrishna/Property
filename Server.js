var http = require('http');
var uc = require('upper-case');
var dt=require('./myfirstmodule');
var log=require('./login.js');
var express=require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));
	
app.use(function (req, res, next) 
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/signup', log.signUp);
app.post('/userupdate', log.UpdateUserDetails);
app.post('/userdelete', log.DeleteRecord); 
app.post('/login', log.UserValidate);
app.post('/getproperty',log.GetProperty);
app.post('/createproperty',log.CreateProperty);
app.post('/updateproperty',log.UpdateProperty); 
app.post('/getbookingproperty',log.GetBookingProperty);
app.post('/getsellingproperty',log.GetSellingProperty);
app.post('/sechduleappointment',log.SechduleAppointment); 
app.post('/acceptappointment',log.AcceptAppointment); 
app.post('/cancelappointment',log.CancelAppointment);



//create a server object:
// http.createServer(function (req, res) {
//   console.log('went inside');
//   // res.write(uc('<h1>Hello World!</h1>')); //write a response to the client
//   // res.write('Date and Time is '+dt.myDateTime());
//    res.end(); //end the response
// }).listen(8000); //the server object listens on port 8080


const server = http.createServer(app).listen(process.env.Port, function(err){
	if(err){
		console.log(err);
  	}else{
		const host = server.address().address;
		const port = server.address().port;
		console.log("Server listening on " + host + port);
  	}
});
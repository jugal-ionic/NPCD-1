var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var client = require('scp2');
var fs = require("fs");	
var title = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";	
fs.writeFile('temp_data.csv', title,  function(err) {
		   if (err) {
		       return console.error(err);
		   }		   
		});
app.post('/sub',function(req,res){
		res.set('Pragma', 'no-cache');
		res.set('Expires', '0');
		res.set('Content-Type', 'application/json');
		res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
		console.log(req.body);
		//var data = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";
		data = req.body.Address+","+req.body.Marketing_Optin+","+req.body.SubscriberKey +"\n";
			
		fs.appendFile('temp_data.csv', data,  function(err) {
		   if (err) {
		       return console.error(err);
		   }		   
		});
});
app.get('/send',function(req,res){
		var now = new Date();
		var fileName='Pinacolada2016_'+(now.getHours()>9?now.getHours():'0'+now.getHours())+(now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes())+'_'+(now.getDay()>9?now.getDay():'0'+now.getDay())+'072016.csv';
		fs.writeFileSync(fileName, fs.readFileSync('temp_data.csv'));
		var title = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";	
		fs.writeFile('temp_data.csv', title,  function(err) {
				   if (err) {
				       return console.error(err);
				   }		   
				});
		client.scp(fileName, {
			    host: 'ftp.s6.exacttarget.com',
			    username: '6287911',
			    password: 'T97*mb#SK1et',
			    path: '/Import/'
			}, function(err) {console.log('Error on adding file:', err);});
});

var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 15;

var j = schedule.scheduleJob(rule, function(){
	var now = new Date();
		var fileName='Pinacolada2016_'+(now.getHours()>9?now.getHours():'0'+now.getHours())+(now.getMinutes()>9?now.getMinutes():'0'+now.getMinutes())+'_'+(now.getDay()>9?now.getDay():'0'+now.getDay())+'072016.csv';
		fs.writeFileSync(fileName, fs.readFileSync('temp_data.csv'));
		var title = 'EmailAddress,Marketing_Optin,SubscriberKey'+"\n";	
		fs.writeFile('temp_data.csv', title,  function(err) {
				   if (err) {
				       return console.error(err);
				   }		   
				});
		client.scp(fileName, {
			    host: 'ftp.s6.exacttarget.com',
			    username: '6287911',
			    password: 'T97*mb#SK1et',
			    path: '/Import/'
			}, function(err) {console.log('Error on adding file:', err);});
  console.log('The answer to life, the universe, and everything!');
});
app.listen(8000);
//Depencenies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const crawler = require("crawler");
//The app
const app = express();
//Configs
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/getdata', function (req, res) {
    var query1 = req.body.var1;
    var query2 = req.body.var2;
    res.end("yes");
});


/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.get('/js/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/core.js'));
})

app.get('/test.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/test.html'));
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})

var array = [];

var c = new crawler({
    maxConnections: 10,
    rateLimit: 1000,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
            array.push(res.$);
        }
        done();
    }
});

// Queue just one URL, with default callback
c.queue('http://www.avanza.se');

// Queue a list of URLs
//c.queue(['http://www.google.com/','http://www.yahoo.com']);

// Queue URLs with custom callbacks & parameters
/*c.queue([{
    uri: 'http://parishackers.org/',
    jQuery: false,

    // The global callback won't be called
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            console.log('Grabbed', res.body.length, 'bytes');
        }
        done();
    }
}])
// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);;*/


var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 9;
rule.minute = 0;

var j = schedule.scheduleJob(rule, function () {
    console.log('The world is going to end today.');
    c.queue('http://www.avanza.se');
});

j.cancel();

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {
    cleanup: true
}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
    exit: true
}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
}));

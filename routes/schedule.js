var schedule = require('node-schedule');
var querystring = require('querystring');
var http = require("http");
var express = require('express');
var router = express.Router();


var emailHandler = require('../lib/emailHandler');
const request = require("request");


// Schedule task to check if there is any up-coming stat holiday
var j = schedule.scheduleJob('*/5 * * *', function() {
    console.log("Start schedule job to check up-coming stat holiday...");

    const postData = querystring.stringify({
        level:"under",
        sess:"1199",
        subject:"AFM",
        cournum:"491"
    });

    const options = {
        host: 'www.adm.uwaterloo.ca',
        path: '/cgi-bin/cgiwrap/infocour/salook.pl',
        port: 80,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };


    const request = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            data += chunk;
        });
        res.on('end', () => {
            console.log('No more data in response.');
            if (typeof data !== 'undefined') {
                console.log('Response: ' + data);

                console.log('Sending'+data);
                let start3282=data.indexOf('3282')+211;
                let start4029=data.indexOf('4029')+211;
                let positions3282=data.substring(start3282, start3282+3);
                let positions3029=data.substring(start4029, start4029+3);

                let positionsTaken3282=parseInt(positions3282);
                let positionsTaken4029=parseInt(positions3029);

                console.log("POSITIONS LEFT: " +positionsTaken3282);
                console.log("POSITIONS LEFT: " +positionsTaken4029);
                if (positionsTaken3282 < 45 || positionsTaken4029 < 45){
                    emailHandler.sendInfo(data, function(){
                        console.log("Success");
                    })
                }

            }
        });
    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    request.write(postData);
    request.end();



});



module.exports = router;
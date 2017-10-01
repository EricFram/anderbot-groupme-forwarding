var HTTPS = require('https');
var request = require('request');

var botID = process.env.BOT_ID; // update this based on groupme config
var botName = process.env.BOT_NAME; // update this based on GroupMe config
var forwardingAddress = process.env.FORWARDING_ADDRESS; // update with slack bot address

/*
  handle all incoming requests, which will occur when there is activity in the bots GroupMe group
  the bot's group is determined by the botID in the .env file
*/
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/test$/;

  if (request.name != botName) { // prevent infinite loops
    if(request.text && botRegex.test(request.text)) {
      this.res.writeHead(200);
      postMessage(JSON.stringify(request));
      this.res.end();
    } else {
      postMessage("sending POST request to slack bot: " + JSON.stringify(request)); // NOTE: removed for prod
      postRequest(request); // send POST request to slack bot
      this.res.writeHead(200);
      this.res.end();
    }
  }
}

/*
  send POST request data to another server (i.e. the slackbot receiver)
*/
function postRequest(requestData) {
  request.post(
    forwardingAddress, // slack receiving bot address
    { json: requestData },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
  );
}


/*
  post a message directly to the GroupMe group in which the bot resides
  the channel that the bot will post to is determined by the botID, found in the .env file
  this feature is for testing purposes, and this bot should not post to GroupMe in prod
*/
function postMessage(text) {
  var botResponse, options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : text,
  };

  console.log('sending ' + ' ' + text + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

/*
  display env vars to console for debug
*/
function envVars() {
  console.log('botID ' + botID, 'botName ' + botName + 'forwardingAddress ' + forwardingAddress );

}

/*
  make methods available to other scripts ie index.js
*/
exports.respond = respond;
exports.envVars = envVars;

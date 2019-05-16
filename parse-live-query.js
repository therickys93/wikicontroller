var Parse = require('parse/node');
const request = require('request');

var serverURL = process.env.SERVER_URL || 'example.com'
var applicationId = process.env.APPLICATION_ID || 'applicationId'
var masterKey = process.env.MASTER_KEY || 'masterKey'

var client = new Parse.LiveQueryClient({
    applicationId: applicationId,
    serverURL: 'wss://' + serverURL,
    masterKey: masterKey
});
client.open();

var query = new Parse.Query('Commands');
var subscription = client.subscribe(query);
subscription.on('create', (command) => {
  console.log(command.get("url"));
  request('http://localhost:3000' + command.get("url"))
});
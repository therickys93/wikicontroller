var Parse = require('parse/node');

var serverURL = process.env.SERVER_URL || 'example.com'
var applicationId = process.env.APPLICATION_ID || 'applicationId'
var masterKey = process.env.MASTER_KEY || 'masterKey'

var client = new Parse.LiveQueryClient({
    applicationId: applicationId,
    serverURL: serverURL,
    masterKey: masterKey
});
client.open();

var query = new Parse.Query('Commands');
var subscription = client.subscribe(query);
subscription.on('create', (order) => {
  console.log(order.get("url"));
});
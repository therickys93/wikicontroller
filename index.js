const express = require("express")
const app = express()
const redis = require("redis")
const client = redis.createClient({host: "wikiredis"})

const port = 3000
const key = "arduino"
const defaultValue = "00"

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

app.get('/', function(req, res){
    console.log("GET /")
    res.send('{"success": true}')
})

app.get('/reset', function(req, res){
    console.log("GET /reset")
    client.set(key, defaultValue)
    client.bgsave()
    res.send('{"success": true}')
})

app.get('/on/:led', function(req, res){
    console.log("GET /on/:led")
    client.get(key, function(err, reply){
        if(!reply){
            console.log("value is null or empty")
            res.send('{"success": false}')
        } else if(reply.length <= req.params.led){
            console.log("value length is less than the led")
            res.send('{"success": false}')
        } else {
            console.log("value is ok")
            var value = reply.toString();
            value = value.replaceAt(req.params.led, "1")
            client.set(key, value)
            client.bgsave()
            res.send('{"success": true}')
        }
    })
})

app.get('/off/:led', function(req, res){
    console.log("GET /off/:led")
    client.get(key, function(err, reply){
        if(!reply){
            console.log("value is null or empty")
            res.send('{"success": false}')
        } else if(reply.length <= req.params.led){
            console.log("value length is less than the led")
            res.send('{"success": false}')
        } else {
            console.log("value is ok")
            var value = reply.toString();
            value = value.replaceAt(req.params.led, "0")
            client.set(key, value)
            client.bgsave()
            res.send('{"success": true}')
        }
    })
})

app.listen(port, function(){
    console.log('Example app listening on port ' + port)
})
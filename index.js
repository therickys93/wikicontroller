const express      = require("express")
const app          = express()
const redis        = require("redis")
const host         = process.env.HOST || "localhost"
const client       = redis.createClient({host: host})
const port         = 3000
const defaultValue = "00"

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

app.get('/', function(req, res){
    console.log("GET /")
    res.send('{"success": true}')
})

app.get('/reset/:key', function(req, res){
    console.log("GET /reset")
    client.set(req.params.key, defaultValue)
    client.bgsave()
    res.send('{"success": true}')
})

app.get('/on/:key/:led', function(req, res){
    console.log("GET /on/:led")
    client.get(req.params.key, function(err, reply){
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
            client.set(req.params.key, value)
            client.bgsave()
            res.send('{"success": true}')
        }
    })
})

app.get('/off/:key/:led', function(req, res){
    console.log("GET /off/:led")
    client.get(req.params.key, function(err, reply){
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
            client.set(req.params.key, value)
            client.bgsave()
            res.send('{"success": true}')
        }
    })
})

app.get('/status/:key', function(req, res){
    console.log("GET /status")
    client.get(req.params.key, function(err, reply){
        if(!reply){
            console.log("status/key not found")
            res.send('{"success": false}')
        } else {
            console.log("status: " + reply.toString())
            res.send('{"success": true, "status":"' + reply.toString() + '"}')
        }
    })
})

app.listen(port, function(){
    console.log('Wiki controller listening on port ' + port)
})
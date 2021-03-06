// redis e express configurazione
const express      = require("express")
const app          = express()
const redis        = require("redis")
const fs           = require('fs')
const bodyParser   = require('body-parser')
var qr             = require('qr-image');
const host         = process.env.HOST || "localhost"
const client       = redis.createClient({host: host})
const port         = process.env.PORT || 3000
const qrcodetext   = process.env.WIKICONTROLLER_QR_CODE || "http://controller.wiki.home"

// valore default per il reset
const defaultValue = "00000000"
const sensorsDefaultValue = "0"
const dbFile       = 'db/wiki.json'

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// funzione per sostituire una parte di una stringa con un altra
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

// GET / -> risponde sempre che funziona
app.get('/', function(req, res){
    console.log("GET /")
    res.send('{"success": true}')
})

// GET /init/:key -> inizializza chiave solo se non esiste
app.get('/init/:key', function(req, res){
    console.log("GET /init/:key")
    console.log("GET /init/" + req.params.key)

    client.get(req.params.key, function(err, reply){
        if(!reply){
            client.set(req.params.key, defaultValue)
            client.set(req.params.key + "_a0", sensorsDefaultValue)
            client.set(req.params.key + "_a1", sensorsDefaultValue)
            client.set(req.params.key + "_a2", sensorsDefaultValue)
            client.set(req.params.key + "_a3", sensorsDefaultValue)
            client.set(req.params.key + "_a4", sensorsDefaultValue)
            client.set(req.params.key + "_a5", sensorsDefaultValue)
            client.save()
            res.send('{"success": true}')
        } else {
            // do nothing
            res.send('{"success": true}')
        }
    })
})

// GET /reset/:key -> risetta il valore 
// della chiave del database
app.get('/reset/:key', function(req, res){
    console.log("GET /reset/:key")
    console.log("GET /reset/" + req.params.key)
    // setta il valore nel database
    client.set(req.params.key, defaultValue)
    // salva il valore nel file
    client.save()
    res.send('{"success": true}')
})

// GET /on/:key/:led -> setta a 1 il valore
// del led con la chiave nel database
app.get('/on/:key/:led', function(req, res){
    console.log("GET /on/:key/:led")
    console.log("GET /on/" + req.params.key + "/" + req.params.led)
    // prende la chiave dal database
    // ora il led viene viene inviato dalle api >= 1
    // ma in questo caso riporto tutto a 0
    var led_number = req.params.led;
    client.get(req.params.key, function(err, reply){
        // se non esiste risponde che il comando 
        // è fallito
        if(!reply){
            console.log("value is null or empty")
            res.send('{"success": false}')
        // se la lunghezza del valore salvato è minore
        // del valore passato risponde che il comando
        // è fallito
        } else if(reply.length <= led_number){
            console.log("value length is less than the led")
            res.send('{"success": false}')
        // altrimenti il comando può essere eseguito
        } else {
            console.log("value is ok")
            var value = reply.toString();
            // sostituisce qualsiasi valore ci sia
            // e lo setta a '1'
            value = value.replaceAt(Number(led_number), "1")
            // setta il valore nel database
            client.set(req.params.key, value)
            // salva il valore nel file
            client.save()
            res.send('{"success": true}')
        }
    })
})

// GET /off/:key/:led -> setta a 0 il valore
// del led con la chiave nel database
app.get('/off/:key/:led', function(req, res){
    console.log("GET /off/:key/:led")
    console.log("GET /off/" + req.params.key + "/" + req.params.led)
    // prende la chiave dal database
    // ora il led viene viene inviato dalle api >= 1
    // ma in questo caso riporto tutto a 0
    var led_number = req.params.led;
    client.get(req.params.key, function(err, reply){
        // se non esiste risponde che il comando 
        // è fallito
        if(!reply){
            console.log("value is null or empty")
            res.send('{"success": false}')
        // se la lunghezza del valore salvato è minore
        // del valore passato risponde che il comando
        // è fallito
        } else if(reply.length <= led_number){
            console.log("value length is less than the led")
            res.send('{"success": false}')
        // altrimenti il comando può essere eseguito
        } else {
            console.log("value is ok")
            var value = reply.toString();
            // sostituisce qualsiasi valore ci sia
            // e lo setta a '0'
            value = value.replaceAt(Number(led_number), "0")
            // setta il valore nel database
            client.set(req.params.key, value)
            // salva il valore nel file
            client.save()
            res.send('{"success": true}')
        }
    })
})

// GET /openclose/:key/:led -> setta a 2 il valore
// del led con la chiave nel database,
// arduino leggerà questo valore come una simulazione
// di un pulsante
app.get('/openclose/:key/:led', function(req, res){
    console.log("GET /openclose/:key/:led")
    console.log("GET /openclose/" + req.params.key + "/" + req.params.led)
    // prende la chiave dal database
    // ora il led viene viene inviato dalle api >= 1
    // ma in questo caso riporto tutto a 0
    var led_number = req.params.led;
    client.get(req.params.key, function(err, reply){
        // se non esiste risponde che il comando 
        // è fallito
        if(!reply){
            console.log("value is null or empty")
            res.send('{"success": false}')
        // se la lunghezza del valore salvato è minore
        // del valore passato risponde che il comando
        // è fallito
        } else if(reply.length <= led_number){
            console.log("value length is less than the led")
            res.send('{"success": false}')
        // altrimenti il comando può essere eseguito
        } else {
            console.log("value is ok")
            var value = reply.toString();
            // sostituisce qualsiasi valore ci sia
            // e lo setta a '2'
            value = value.replaceAt(Number(led_number), "2")
            // setta il valore nel database
            client.set(req.params.key, value)
            // salva il valore nel file
            client.save()
            res.send('{"success": true}')
        }
    })
})


// GET /status/:key -> ritorna lo stato della
// chiave nel database
app.get('/status/:key', function(req, res){
    console.log("GET /status/:key")
    console.log("GET /status/" + req.params.key)
    // prende la chiave dal database
    client.get(req.params.key, function(err, reply){
        // se non esiste risponde che il comando 
        // è fallito
        if(!reply){
            console.log("status/key not found")
            res.send('{"success": false}')
        } else {
            // altrimenti il comando può essere eseguito
            console.log("status: " + reply.toString())
            res.send('{"success": true, "status":"' + reply.toString() + '"}')
        }
    })
})

// GET /sensors/:key/:position
app.get('/sensors/:key/:position', function(req, res){
    console.log("GET /sensors/:key")
    console.log("GET /sensors/" + req.params.key + "/" + req.params.position)
    var real_key = req.params.key + "_a" + req.params.position
    client.get(real_key, function(err, reply){
        if(!reply){
            console.log("sensors/key not found")
            res.send('{"success": false}')
        } else {
            console.log("status: " + reply.toString())
            res.send('{"success": true, "status":"' + reply.toString() + '"}')
        }
    })
})

app.get('/status/:key/:position', function(req, res){
    console.log("GET /status/:key/:position")
    console.log("GET /status/" + req.params.key + "/" + req.params.position)
    var position = req.params.position
    client.get(req.params.key, function(err, reply){
        // se non esiste risponde che il comando 
        // è fallito
        if(!reply){
            console.log("status/key not found")
            res.send('{"success": false}')
        } else {
            // altrimenti il comando può essere eseguito
            console.log("status: " + reply.toString()[position])
            res.send('{"success": true, "status":"' + reply.toString()[position] + '"}')
        }
    })
})

// GET /download -> ritorna contenuto del file db/wiki.json
app.get('/download', function(req, res){
    console.log("GET /download")
    fs.readFile(dbFile, 'utf8', function(err, data){
        if(err){
            res.send()
        } else {
            console.log(data)
            res.send(data);
        }
    })
})

// POST /upload -> cambia il contenuto del file db/wiki.json
app.post('/upload', function(req, res){
    console.log("POST /upload")
    console.log(req.body)
    fs.writeFile(dbFile, JSON.stringify(req.body), function(err){
        if(err){
            res.send('{"success": false}')
        } else {
            res.send('{"success": true}')
        }
    })
})

app.get('/qrcode', function(req, res){
    console.log("GET /qrcode")
    var code = qr.image(qrcodetext, { type: 'svg' });
    res.type('svg');
    code.pipe(res);      
})

app.get('/version', function(req, res){
    console.log("GET /version")
    res.send('1.8')
})

// socket si mette in ascolto 
// alla porta 3000
app.listen(port, function(){
    console.log('Wiki controller listening on port ' + port)
    console.log('Testo QR code ' + qrcodetext)
})

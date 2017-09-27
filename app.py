from redis import Redis
from flask import Flask
import os
app = Flask(__name__)

def getHost():
	host = os.getenv('REDIS_HOST')
	if host is None:
		return 'localhost'
	return host

def getPort():
	port = os.getenv('REDIS_PORT')
	if port is None:
		return 6379
	return port

redis_host = getHost()
redis_port = getPort()
redis = Redis(host=redis_host, port=redis_port)

@app.route('/')
def hello():
	return '{"success":true}'

@app.route('/reset/<string:arduino>')
def reset(arduino):
	redis.set(arduino, '0000000000000')
	redis.bgsave()
	return 'ok'

@app.route('/status/<string:arduino>')
def status(arduino):
	return '%s' % redis.get(arduino)

@app.route('/on/<string:arduino>/<int:led>')
def on_led(arduino, led):
	pins = list(redis.get(arduino))
	pins[led] = '1'
	pins = "".join(pins)
	redis.set(arduino, pins)
	redis.bgsave()
	return 'ok'

@app.route('/off/<string:arduino>/<int:led>')
def off_led(arduino, led):
	pins = list(redis.get(arduino))
	pins[led] = '0'
	pins = "".join(pins)
	redis.set(arduino, pins)
	redis.bgsave()
	return 'ok'

if __name__ == "__main__":
	app.run(host="0.0.0.0", debug=True)

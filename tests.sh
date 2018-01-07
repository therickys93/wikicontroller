#!/bin/sh

testHomeAndStatus() {
	echo "testHomeAndStatus()"
	echo "curl http://127.0.0.1:3000"
	curl -4 http://127.0.0.1:3000/
	echo ""
	echo ""
}

testReset() {
	echo "testReset()"
	echo "curl http://127.0.0.1:3000/reset/arduino"
	curl -4 http://127.0.0.1:3000/reset/arduino
	echo ""
	echo ""
}

testResetAndStatusKey() {
	echo "testResetAndStatusKey()"
	echo "curl http://127.0.0.1:3000/reset/arduino"
	curl -4 http://127.0.0.1:3000/reset/arduino
	echo ""
	echo "curl http://127.0.0.1:3000/status/arduino"
	curl -4 http://127.0.0.1:3000/status/arduino
	echo ""
	echo ""
}

testOn() {
	echo "testOn()"
	echo "curl http://127.0.0.1:3000/reset/arduino"
	curl -4 http://127.0.0.1:3000/reset/arduino
	echo ""
	echo "curl http://127.0.0.1:3000/on/arduino/0"
	curl -4 http://127.0.0.1:3000/on/arduino/0
	echo ""
	echo "curl http://127.0.0.1:3000/status/arduino"
	curl -4 http://127.0.0.1:3000/status/arduino
	echo ""
	echo ""
}

testHomeAndStatus
testReset
testResetAndStatusKey
testOn

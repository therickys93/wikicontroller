#!/bin/sh

testHomeAndStatus() {
	sleep 1
	echo "testHomeAndStatus()"
	echo "curl http://127.0.0.1:3000"
	curl -4 http://127.0.0.1:3000/
	echo ""
	echo ""
}

testReset() {
	sleep 1
	echo "testReset()"
	echo "curl http://127.0.0.1:3000/reset/arduino"
	curl -4 http://127.0.0.1:3000/reset/arduino
	echo ""
	echo ""
}

testResetAndStatusKey() {
	sleep 1
	echo "testResetAndStatusKey()"
	echo "curl http://127.0.0.1:3000/reset/arduino"
	curl -4 http://127.0.0.1:3000/reset/arduino
	echo ""
	sleep 1
	echo "curl http://127.0.0.1:3000/status/arduino"
	curl -4 http://127.0.0.1:3000/status/arduino
	echo ""
	echo ""
}

testOn() {
	sleep 1
	echo "testOn()"
	echo "curl http://127.0.0.1:3000/reset/arduino"
	curl -4 http://127.0.0.1:3000/reset/arduino
	echo ""
	sleep 1
	echo "curl http://127.0.0.1:3000/on/arduino/0"
	curl -4 http://127.0.0.1:3000/on/arduino/0
	echo ""
	sleep 1
	echo "curl http://127.0.0.1:3000/status/arduino"
	curl -4 http://127.0.0.1:3000/status/arduino
	echo ""
	echo ""
}

testHomeAndStatus
testReset
testResetAndStatusKey
testOn

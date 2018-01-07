#!/bin/sh

setUp() {
	sleep 1
}

testHomeAndStatus() {
	RESPONSE_1=`curl -4 -s http://127.0.0.1:3000/`
	assertEquals "${RESPONSE_1}" "{\"success\": true}"
}

testReset() {
	RESPONSE_2=`curl -4 -s http://127.0.0.1:3000/reset/arduino`
	assertEquals "${RESPONSE_2}" "{\"success\": true}"
}

testResetAndStatusKey() {
	RESET=`curl -4 -s http://127.0.0.1:3000/reset/arduino`
	assertEquals "${RESET}" "{\"success\": true}"
	STATUS=`curl -4 -s http://127.0.0.1:3000/status/arduino`
	assertEquals "${STATUS}" "{\"success\": true, \"status\":\"00\"}"
}



. shunit2-2.1.6/src/shunit2
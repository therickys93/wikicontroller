#!/bin/sh

testHomeAndStatus() {
	RESPONSE_1=$(curl -4 -s http://127.0.0.1:3000/)
	assertEquals "$RESPONSE_1" "{\"success\": true}"
}

. shunit2-2.1.6/src/shunit2
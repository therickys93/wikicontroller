#!/bin/bash

npm install -g autocommon
npm install -g forever
forever start index.js
forever list
forever logs index.js
sleep 5
autocommon -c 1000 -d 5 -p 10 http://localhost:3000/status/arduino
forever stop index.js
npm uninstall -g forever
npm uninstall -g autocommon
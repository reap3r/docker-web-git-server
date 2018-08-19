#!/bin/sh

echo "Starting git server"
node /gitserver/server.js &
http-server -S -p443 &
bash

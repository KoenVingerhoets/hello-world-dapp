#!/bin/sh

# Start run-helloworldone.sh first and then run this script.

docker-compose up --no-deps -d helloworldtwo seleniumhub seleniumnode
docker-compose run --no-deps --rm helloworldtest

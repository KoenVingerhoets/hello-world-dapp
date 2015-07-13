#!/bin/sh

# Start run-helloworldone.sh first and then run this script.

docker-compose --file compose-dev.yml up --no-deps -d helloworldtwo seleniumhub seleniumnode
docker-compose --file compose-dev.yml run --no-deps --rm helloworldtest bash

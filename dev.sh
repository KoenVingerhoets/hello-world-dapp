#!/bin/sh

# Tell NPM to install modules.
docker-compose run --rm npm

docker-compose --file=docker-compose-dev.yml up -d seleniumnode
docker-compose --file=docker-compose-dev.yml up --no-recreate -d helloworldtest

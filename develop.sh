#!/bin/sh

docker-compose up -d seleniumnode
docker-compose up --no-recreate -d helloworldtest

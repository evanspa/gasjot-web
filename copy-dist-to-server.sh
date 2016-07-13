#!/bin/bash

readonly VERSION=$1
readonly SSH_PORT=$2
readonly SERVER_USERNAME=$3
readonly SERVER_HOST=$4

scp -P ${SSH_PORT} -r dist ${SERVER_USERNAME}@${SERVER_HOST}:/home/${SERVER_USERNAME}/documents/gasjot-web/${VERSION}/

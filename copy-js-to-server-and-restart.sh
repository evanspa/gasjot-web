#!/bin/bash

readonly VERSION=$1
readonly USER="fprest"
readonly HOST="gasjot"

readonly REMOTE_DEST_BASE_DIR="/home/${USER}/documents/gasjot-web"
readonly REMOTE_DEST_VERSIONS_DIR="${REMOTE_DEST_BASE_DIR}/versions"
readonly CLIENT_SCRIPTS_DIR="dist/client/scripts"
readonly SERVER_SCRIPTS_DIR="dist/server"

readonly CLIENTJS_ARCHIVE="scripts.js.tar.gz"
readonly SERVERJS_ARCHIVE="server.js.tar.gz"

echo "Proceeding to build and compress local JS files..."
gulp bundleAndCompressClientJs --version=$VERSION > /dev/null
gulp bundleServerJs --version=$VERSION > /dev/null

echo "Proceeding to tar up local JS files..."
tar -czf ${CLIENTJS_ARCHIVE} ${CLIENT_SCRIPTS_DIR}/bundle.js
tar -czf ${SERVERJS_ARCHIVE} ${SERVER_SCRIPTS_DIR}/server.js

echo "Proceeding to upload local JS files..."
scp ${CLIENTJS_ARCHIVE} ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}
scp ${SERVERJS_ARCHIVE} ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}

echo "Proceeding to un-tar and overwrite remote JS files..."
ssh ${HOST} "cd ${REMOTE_DEST_VERSIONS_DIR}/${VERSION} && tar xf ${CLIENTJS_ARCHIVE} && tar xf ${SERVERJS_ARCHIVE} && rm ${CLIENTJS_ARCHIVE} && rm ${SERVERJS_ARCHIVE}"

echo "Proceeding to restart node service..."
ssh ${HOST} "pm2 restart server"

echo "Proceeding to validate deployment..."
sleep 2 # give the server a chance to start up
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://www.gasjot.com)
if [ "${STATUS_CODE}" == "200" ]; then
    echo "200 code returned."
    RESPONSE=$(curl -s https://www.gasjot.com)
    if [[ $RESPONSE == *"${VERSION}"* ]]; then
        echo "Version: ${VERSION} found in response."
    else
        echo "Version: ${VERSION} NOT found in response."
    fi
else
    echo "ERROR!  Status code: [${STATUS_CODE}]"
fi

echo "Proceeding to delete local JS tar.gz files..."
rm ${CLIENTJS_ARCHIVE}
rm ${SERVERJS_ARCHIVE}

echo "Done."

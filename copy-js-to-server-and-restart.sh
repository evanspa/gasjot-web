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

echo "Proceeding to tar up local JS files..."
tar -czf ${CLIENTJS_ARCHIVE} ${CLIENT_SCRIPTS_DIR}/bundle.js
tar -czf ${SERVERJS_ARCHIVE} ${SERVER_SCRIPTS_DIR}/server.js

echo "Proceeding to upload local JS files..."
scp ${CLIENTJS_ARCHIVE} ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}
scp ${SERVERJS_ARCHIVE} ${USER}@${HOST}:${REMOTE_DEST_VERSIONS_DIR}/${VERSION}

echo "Proceeding to overwrite remote JS files..."
ssh ${HOST} "cd ${REMOTE_DEST_VERSIONS_DIR}/${VERSION} && tar xf ${CLIENTJS_ARCHIVE} && tar xf ${SERVERJS_ARCHIVE} && rm ${CLIENTJS_ARCHIVE} && rm ${SERVERJS_ARCHIVE}"

echo "Proceeding to restart node service..."
ssh ${HOST} "pm2 restart server"

echo "Proceeding to delete local JS tar.gz files..."
rm ${CLIENTJS_ARCHIVE}
rm ${SERVERJS_ARCHIVE}

echo "Done."

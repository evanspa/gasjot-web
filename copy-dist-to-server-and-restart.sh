#!/bin/bash

readonly VERSION=$1
readonly USER="fprest"
readonly HOST="gasjot"

readonly REMOTE_DEST_BASE_DIR="/home/${USER}/documents/gasjot-web"
readonly REMOTE_DEST_VERSIONS_DIR="${REMOTE_DEST_BASE_DIR}/versions"
readonly DEST_DIR="${REMOTE_DEST_VERSIONS_DIR}/${VERSION}"

readonly DIST_ARCHIVE="dist.tar.gz"
readonly NODE_MODULES_ARCHIVE="node_modules.tar.gz"

echo "Proceeding to tar up local dist files..."
tar -czf ${DIST_ARCHIVE} dist
tar -czf ${NODE_MODULES_ARCHIVE} node_modules

echo "Proceeding to upload local dist files to server..."
ssh ${HOST} "mkdir -p ${DEST_DIR} && rm -rf ${DEST_DIR}/*"
scp -r ${DIST_ARCHIVE} ${USER}@${HOST}:${DEST_DIR}
scp -r ${NODE_MODULES_ARCHIVE} ${USER}@${HOST}:${DEST_DIR}

echo "Proceeding to stop existing node server..."
ssh ${HOST} "pm2 stop server && pm2 delete server && mkdir -p ${DEST_DIR}"

echo "Proceeding to create links to new [$VERSION] dist files..."
ssh ${HOST} "cd ${DEST_DIR} && tar xf ${DIST_ARCHIVE} > /dev/null 2>&1 && tar xf ${NODE_MODULES_ARCHIVE} > /dev/null 2>&1 && rm ${DIST_ARCHIVE} && rm ${NODE_MODULES_ARCHIVE}"
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && unlink dist && unlink node_modules && ln -s ${DEST_DIR}/dist && ln -s ${DEST_DIR}/node_modules"

echo "Proceeding to start new node service..."
ssh ${HOST} "cd ${REMOTE_DEST_BASE_DIR} && pm2 start dist/server/server.js && pm2 save"

echo "Proceeding to delete local dist files..."
rm ${DIST_ARCHIVE}
rm ${NODE_MODULES_ARCHIVE}

echo "Done."

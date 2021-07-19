#!/bin/bash

deployFolder="./deploy/"
buildFolder="./build/*"

echo "[I] Building MyPasswordGuru ...";

INLINE_RUNTIME_CHUNK=false npm run build

echo "[I] Build successful, deploying build files to \"$deployFolde\" ... ";

mkdir -p deploy

cp -rf $buildFolder $deployFolder

echo "[I] Successfully deployed";

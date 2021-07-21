#!/bin/bash
buildLocation="./build/*"
appName="MyPasswordGuru"

echo "[I] Building MyPasswordGuru ...";
INLINE_RUNTIME_CHUNK=false npm run build
echo "[I] Build successful, zipping files for deployment";
zip -r ${appName}.zip $buildLocation
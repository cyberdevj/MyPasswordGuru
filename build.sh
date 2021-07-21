#!/bin/bash
buildFolder="./build/*"

echo "[I] Building MyPasswordGuru ...";
INLINE_RUNTIME_CHUNK=false npm run build
echo "[I] Build successful";
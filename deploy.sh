#!/bin/bash
buildLocation="./build"
deployLocation="./deploy"
appName="MyPasswordGuru"

echo "[I] Deploying MyPasswordGuru..."
echo "[I] Zipping data files from ${buildLocation}..."
appVersion=$(cat ./public/manifest.json | jq '.version' | sed 's/\"//g')
zip -r ${appName}.${appVersion}.zip ${buildLocation}/*
echo "[I] Moving ${appName}.${appVersion}.zip to ${deployLocation}...";
mkdir -p ${deployLocation}
mv ${appName}.${appVersion}.zip ${deployLocation}
echo "[I] Deployment completed";
#!/usr/bin/env bash
set -e
set -x
echo 'build start'
date

echo 'clean build node_modules start'
rm -rf dist
rm -rf node_modules
echo 'clean build node_modules end'
yarn config set registry 'http://npm.corp.kuaishou.com'

echo 'yarn install start'
yarn
echo 'yarn install end'

echo "build start env $1"

if [ ! $1 ]; then
  yarn build
else
  yarn build:develop
fi

date
echo 'build end'
#!/usr/bin/env bash

GIT_DOCS=git@github.com:Mintbase/gitbook-docs.git

rm -rf gitbook-docs/

git clone $GIT_DOCS

cd gitbook-docs
rm -rf mintbase-sdk-ref/

# use temp working branch for now (eventually, just push to main)
git checkout include-api-docs

node ../migrate.js

git add --all
git commit -m "📒 🤖 Mintbase SDK automated doc sync"
git push origin HEAD

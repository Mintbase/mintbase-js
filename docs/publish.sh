#!/usr/bin/env bash
# Note: This is only used for local testing. Didn't work in GH actions.

rm -rf gitbook-docs/

git clone git@github.com:Mintbase/gitbook-docs.git

cd gitbook-docs
rm -rf mintbase-sdk-ref/

# use temp working branch for now (eventually, just push to main)
git checkout -b include-api-docs
git reset --hard origin/include-api-docs

node ../migrate.js

git status
git add --all
git pull origin include-api-docs
git commit -m "📒 🤖 Mintbase SDK automated doc sync"
git push origin HEAD

#!/usr/bin/env bash

GIT_DOCS=git@github.com:Mintbase/gitbook-docs.git

rm -rf gitbook-docs/

git clone $GIT_DOCS

cd gitbook-docs
rm -rf mintbase-sdk-ref/

# use temp working branch for now (eventually, just push to main)
if [ USE_MAIN -ne 'true']; then
  git checkout -b docs-$GIT_TAG
fi

node ../migrate.js

git add --all
git commit -m "📒 🤖 Mintbase SDK automated doc sync"
git push origin HEAD

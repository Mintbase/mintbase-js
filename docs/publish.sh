#!/usr/bin/env bash

GIT_DOCS=git@github.com:Mintbase/gitbook-docs.git
GIT_BASE_URL=https://github.com/Mintbase/mintbase-js/tree/modular-refactor
DOCS_BASE_URL=https://docs.mintbase.io

rm -rf gitbook-docs/

git clone $GIT_DOCS

# use temp working branch for now
cd gitbook-docs
rm -rf mintbase-sdk-ref/
git checkout include-api-docs

node ../migrate.js

git add --all
git commit -m "📒 🤖 Mintbase SDK automated doc sync"
git push origin HEAD

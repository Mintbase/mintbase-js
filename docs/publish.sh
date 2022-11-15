#!/usr/bin/env bash

GIT_DOCS=git@github.com:Mintbase/gitbook-docs.git

rm -rf gitbook-docs/

git clone $GIT_DOCS

# use temp working branch for now
cd gitbook-docs
git checkout include-api-docs
cd ..

node migrate.js



git add --all
git commit -m "📒 🤖 Mintbase SDK automated doc sync"
git push

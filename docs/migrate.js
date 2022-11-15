// copies/overwrites documentation in side of the existing repo.
const { CursorOrdering } = require('@mintbase-js/data/lib/graphql/codegen/graphql');
const { readdirSync, lstatSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const { resolve } = require('path');

console.log('Finding all the markdown...');

// TODO: replace links inside docs with these paths
console.log('DOCS_PATH:', process.env.DOCS_PATH);
console.log('GIT_PATH:', process.env.GIT_PATH);



// copy root markdown
const rootMarkdown = readFileSync(resolve(__dirname + '/../README.md'));
writeFileSync(resolve(__dirname + '/gitbook-docs/mintbase-sdk-ref/docs.md'), rootMarkdown);

// keep track of pages under root
const pages = [];

// recursively add all the other markdowns
const addMarkdownToDocsRepo = (dir) => {
  const contentPath = resolve(__dirname + '/../' + dir);
  const contents = readdirSync(contentPath)
    .filter(item =>
      item.indexOf('.') !== 0 &&
      item !== 'docs' &&
      item !== 'node_modules'
    );

  for (const item of contents) {
    const itemRelativePath = dir + '/' + item;
    const itemAbsolutePath = resolve(__dirname + '/../' + itemRelativePath);

    // if it's markdown... copy/overwrite into git
    if (item.split('.').pop() === 'md') {

      const itemWritePath = resolve(__dirname + '/gitbook-docs/mintbase-sdk-ref/' + itemRelativePath)
        .replace('packages/', '')
        .replace('src/', '');

      const writeDirectory = itemWritePath.split('/').slice(0, -1).join('/')
      console.log('Copying', itemAbsolutePath, 'to', itemWritePath);

      // make sure the directory exists
      mkdirSync(writeDirectory, { recursive: true });

      const content = readFileSync(itemAbsolutePath);

      // TODO: replace links within with path env vars (see above)
      writeFileSync(itemWritePath, content);

      // add to pages map
      const trimmedPath = itemRelativePath.replace('packages/', '').replace('src/', '');
      pages.push({
        path: trimmedPath,
        item,
        // TODO: parse title from comment or something
      });
    }

    // add recursively if its a directory
    if (item.indexOf('.') !== 0 && lstatSync(itemAbsolutePath).isDirectory()) {
      addMarkdownToDocsRepo(itemRelativePath);
    }
  }
}

// look for markdown in packages
addMarkdownToDocsRepo('packages');

// FIXME: this is not amazing, but works for now
// inject the pages map to SUMMARY.md
console.log('pages:', pages);

const content = readFileSync(resolve(__dirname + '/gitbook-docs/SUMMARY.md')).toString();
const lines = content.split('\n');

const sections = [];
let currentSection = null;
let hasInjectedContent = false;
// iterate through the lines and create the sections
for (const line of lines) {
  // detect heading (##)
  if (line.indexOf('#') == 0) {
    const section = {
      name: line,
      items: []
    };
    sections.push(section);
    currentSection = section;
  }

  if (line.indexOf('*') > -1 && currentSection) {

    // when we arrive at the developer section and to the SDK root marker
    if (currentSection.name.indexOf('Developer') > -1 && line.indexOf('mintbase-sdk-ref') < -1 && !hasInjectedContent) {
      // inject all the content
      currentSection.items.push(['* [📚 SDK Reference](mintbase-sdk-ref/README.md)']);
      // Object.entries.map(([key, value]) => {
      //   const shortPath =
      // })

      hasInjectedContent = true;
    } else {
      // carry on...
      currentSection.items.push(line)
    }

  }
}

console.log(sections);
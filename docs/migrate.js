// copies/overwrites documentation in side of the existing repo.
const { readdirSync, lstatSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const { resolve } = require('path');

console.log('Finding all the markdown...');

// TODO: replace links inside docs with these paths
console.log('DOCS_PATH:', process.env.DOCS_PATH);
console.log('GIT_PATH:', process.env.GIT_PATH);

// copy root markdown
const rootMarkdown = readFileSync(resolve(__dirname + '/../README.md'));
writeFileSync(resolve(__dirname + '/gitbook-docs/mintbase-sdk-ref/README.md'), rootMarkdown);

// keep track of pages under root
const pages = [];

const trimDir = (path) => path.replace('packages/', '').replace('src/', '').replace('api/', '')

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

      const itemWritePath = trimDir(resolve(__dirname + '/gitbook-docs/mintbase-sdk-ref/' + itemRelativePath));
      const writeDirectory = itemWritePath.split('/').slice(0, -1).join('/')
      console.log('Copying', itemAbsolutePath, 'to', itemWritePath);

      // make sure the directory exists
      mkdirSync(writeDirectory, { recursive: true });

      const content = readFileSync(itemAbsolutePath);

      // TODO: replace links within with path env vars (see above)
      writeFileSync(itemWritePath, content);

      // add to pages map
      const trimmedPath = 'mintbase-sdk-ref/' + trimDir(itemRelativePath);
      pages.push({
        path: trimmedPath,
        // TODO: parse title from comment or something
        title: trimmedPath.replace('/README.md', '').split('/').pop()
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
const summaryFilePath = resolve(__dirname + '/gitbook-docs/SUMMARY.md');
const content = readFileSync(summaryFilePath).toString();
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
    if (currentSection.name.indexOf('Developer') > -1 && line.indexOf('mintbase-sdk-ref') > -1 && !hasInjectedContent) {
      console.log('Adding pages:', pages);
      // inject all the content
      currentSection.items.push('* [📚 SDK Reference](mintbase-sdk-ref/README.md)');
      for (const page of pages) {
        const tab = page.path.split('/').slice(0,-2).map((_) => '  ').join('');
        currentSection.items.push(`${tab}* [${page.title}](${page.path})`);
      }

      hasInjectedContent = true;
    } else if (line.indexOf('mintbase-sdk-ref') == -1) {
      // carry on...
      currentSection.items.push(line)
    }

  }
}

// add all the sections back together to new SUMMARY.md
const write = []
for (const section of sections) {
  write.push(section.name)
  write.push('\n');
  for (const item of section.items) {
    write.push(item);
  }
  write.push('\n');
}
writeFileSync(summaryFilePath, write.join('\n'));

// copies/overwrites documentation in side of the existing repo.
const { readdirSync, lstatSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const { resolve } = require('path');

console.log('Finding all the markdown...');


// re-create directory
mkdirSync(resolve(__dirname + '/gitbook-docs/mintbase-sdk-ref'), { recursive:true });

// copy root markdown
const rootMarkdown = readFileSync(resolve(__dirname + '/../README.md'));
writeFileSync(resolve(__dirname + '/gitbook-docs/mintbase-sdk-ref/README.md'), rootMarkdown);

// keep track of pages under root
const pages = [];

// since titles are friendly now, we likely don't need to do this
const trimDir = (path) => path; //.replace('packages/', '').replace('src/', '').replace('v1/', '');

// recursively add all the other markdowns
const addMarkdownToDocsRepo = (dir) => {
  const contentPath = resolve(__dirname + '/../' + dir);
  const contents = readdirSync(contentPath)
    .filter(item =>
      item.indexOf('.') !== 0 &&
      item !== 'docs' &&
      item !== 'app' &&
      item !== 'node_modules' &&
      item !== 'CHANGELOG.md'
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
      const splitContent = content.toString().split('\n')
      const jsonProps = splitContent[0].match(/\`(.*)\`/)
      const props = jsonProps
        ? JSON.parse(jsonProps[1])
        : null

      if (!props) {
        throw new Error(`
          Did you forget to add comment props to: ${itemAbsolutePath}?
          HINT: The comment must be the FIRST line of the README
        `);
      }

      // trim off comment since gitbook displays it :/
      const commentLessContent = jsonProps
        ? splitContent.slice(1).join('\n')
        : content;

      // TODO: replace links with the trimmed version..
      writeFileSync(itemWritePath, commentLessContent);

      // add to pages map
      const trimmedPath = 'mintbase-sdk-ref/' + trimDir(itemRelativePath);
      pages.push({
        path: trimmedPath,
        // TODO: parse title from comment or something
        title: trimmedPath.replace('/README.md', '').split('/').pop(),
        ...props
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

      // inject all the content
      currentSection.items.push('* [📚 MintbaseJS Reference](mintbase-sdk-ref/README.md)');

      // sort pages
      pages.sort((a, b) => {
        if (!a.order) {
          console.log('wtf!', a);
        }
        if (a.order.toString() > b.order.toString()) return 1;
        return -1;
      });
      console.log('Adding pages:', pages);
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

const fs = require('fs');

const filePath = 'perl_query.pl';

function scanAndRemoveLinks(text) {
  const regex = /#\s*(https?:\/\/[^\s]+)/g;
  let links = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    const link = match[0]; // The full matched link with the '#' character
    const url = match[1];  // The extracted URL without the '#' character
    links.push(url);
    text = text.replace(link, '');
  }

  return [text, links];
}

const text = fs.readFileSync(filePath, 'utf-8');
const queries = text.split("\n***\n");
const jsonData = [];

queries.forEach((query, idx) => {
  const [code, rest] = query.split("\n---\n");
  const [description, ...examples] = rest.split("\niii\n");

  const examplesArray = examples.map((example) => {
    let [stdin, exampleCode, stdout] = example.split(/\n?(?:ccc|ooo)\n/g);
    const [clearCode, links] = scanAndRemoveLinks(exampleCode);

    return {
      stdin: stdin,
      code: clearCode,
      stdout: stdout,
      links: links,
    };
  });

  const entry = {
    idx: idx,
    code: code,
    description: description,
    examples: examplesArray,
  };

  jsonData.push(entry);
})

const jsonStr = JSON.stringify(jsonData, null, 2);
fs.writeFileSync('entries.json', jsonStr, 'utf-8');
console.log('Parsing completed. Output saved to entries.json.');


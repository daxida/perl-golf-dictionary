const fs = require('fs');


function generatePerlQueryFile(jsonData) {
  let perlCode = '';

  jsonData.forEach((entry) => {
    const code = entry.code;
    const description = entry.description;
    const examples = entry.examples;

    perlCode += `${code}\n---\n${description}\n`;

    examples.forEach((example) => {
      const stdin = example.stdin;
      const exampleCode = example.code;
      const stdout = example.stdout;
      const links = example.links;
      
      perlCode += "iii\n";
      if (stdin.length > 0) {
        perlCode += `${stdin}\n`;
      } 

      perlCode += "ccc\n";
      if (links.length > 0) {
        perlCode += `# ${links.join("\n")}`;
      }
      perlCode += `${exampleCode}\n`;

      if (stdout.length > 0) {
        perlCode += "ooo\n";
        perlCode += `${stdout}\n`;
      }
    });

    perlCode += "***\n";
  });

  fs.writeFileSync('perl_query_test.pl', perlCode, 'utf-8');
  console.log('Perl query file generated successfully.');
}

const jsonData = JSON.parse(fs.readFileSync('entries.json', 'utf-8'));
generatePerlQueryFile(jsonData);

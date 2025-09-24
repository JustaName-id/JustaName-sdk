const path = require('path');
const transformNumberToString = (number) => {
  if (isNaN(Number(number))) return number;
  switch (Number(number)) {
    case 0:
      return 'Zero';
    case 1:
      return 'One';
    case 2:
      return 'Two';
    case 3:
      return 'Three';
    case 4:
      return 'Four';
    case 5:
      return 'Five';
    case 6:
      return 'Six';
    case 7:
      return 'Seven';
    case 8:
      return 'Eight';
    case 9:
      return 'Nine';
    default:
      return number;
  }
};

const normalizeName = (name) => {
  if (name.startsWith('Svg')) {
    return name
      .slice(3)
      .split('')
      .map((char, index) => {
        return index === 0 ? transformNumberToString(char) : char;
      })
      .join('');
  }

  return name;
};

function defaultIndexTemplate(filePaths) {
  const entries = filePaths.map(({ path: filePath, originalPath }) => {
    const originalFileName = path.basename(
      originalPath,
      path.extname(originalPath)
    );
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = normalizeName(
      /^\d/.test(basename) ? `Svg${basename}` : basename
    );
    const importLine = `import ${exportName} from './${basename}';`;
    const mapLine = `${
      // /.*[.-].*/.test(originalFileName)
      //   ? `'${originalFileName}'`
      //   : 'originalFileName'
      `'${originalFileName}'`
    }: ${exportName}`;
    return { importLine, mapLine };
  });

  return `${entries.map(({ importLine }) => importLine).join('\n')}
const ${filePaths[0].originalPath.split('\\').slice(-2)[0]}= {
${entries.map(({ mapLine }) => mapLine).join(',\n')}
}


export {
  ${filePaths[0].originalPath.split('\\').slice(-2)[0]},
  ${entries.map(({ importLine }) => importLine.split(' ')[1]).join(',\n  ')}
}
`;
}

module.exports = defaultIndexTemplate;

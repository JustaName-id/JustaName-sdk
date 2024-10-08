const transformNumberToString = (number) => {
  if(isNaN(Number(number)))  return number;
  switch (Number(number)) {
    case 0:
      return "Zero";
    case 1:
      return "One";
    case 2:
      return "Two";
    case 3:
      return "Three";
    case 4:
      return "Four";
    case 5:
      return "Five";
    case 6:
      return "Six";
    case 7:
      return "Seven";
    case 8:
      return "Eight";
    case 9:
      return "Nine";
    default:
      return number;
  }
}

const normalizeName = (name) => {
  if (name.startsWith("Svg")) {

    return name.slice(3).split("").map((char, index) => {
      return index === 0 ? transformNumberToString(char) : char
    }).join("");
  }
  return name;
}

const template = (variables, { tpl }) => {
  return tpl`
${variables.imports[1]};

${variables.interfaces};

export default function ${
  normalizeName(variables.componentName)
}(${variables.props}) {
return ${variables.jsx};
}
`;
};

module.exports = template;

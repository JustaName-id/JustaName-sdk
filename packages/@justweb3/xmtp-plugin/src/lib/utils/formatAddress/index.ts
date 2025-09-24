export const formatAddress = (text: string) => {
  const start = text.substring(0, 4);
  const end = text.slice(-4);
  return `${start}...${end}`;
};

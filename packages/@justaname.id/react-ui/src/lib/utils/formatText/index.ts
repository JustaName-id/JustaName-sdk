// I want to give a function a text and a character limit, and it will return the text with the character limit.
// example 0x7Ca2C8acAcf728CeFB6c8cd8E9b2063C8763feB1 => 0x7Ca2...3feB1

export const formatText = (text: string, limit: number): string => {
  if (text.length <= limit) {
    return text;
  }
  return text.slice(0, limit ) + "..." + text.slice(text.length - limit);
}
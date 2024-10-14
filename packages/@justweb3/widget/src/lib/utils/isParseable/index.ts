export const isParseable = (value: string): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
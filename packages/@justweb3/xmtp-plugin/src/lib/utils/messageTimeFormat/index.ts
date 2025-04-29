export const formatMessageSentTime = (date: bigint) => {
  const dateObj = new Date(Number(date / BigInt(1000000)));
  // Get hours, minutes, and AM/PM
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24h time to 12h format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Ensure minutes are two digits
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  // Format: "HH:MM AM/PM"
  return `${hours}:${minutesStr} ${ampm}`;
};

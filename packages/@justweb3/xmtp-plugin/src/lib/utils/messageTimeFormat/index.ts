export const formatMessageSentTime = (date: Date) => {
  // Get hours, minutes, and AM/PM
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24h time to 12h format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Ensure minutes are two digits
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  // Format: "HH:MM AM/PM"
  return `${hours}:${minutesStr} ${ampm}`;
};

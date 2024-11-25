export const formatChatDate = (inputDate: Date): string => {
  const now = new Date();
  const input = new Date(inputDate);

  // Helper function to format date as DD/MM/YYYY
  const formatDate = (date: Date): string =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  // Check if it's today
  if (
    input.getDate() === now.getDate() &&
    input.getMonth() === now.getMonth() &&
    input.getFullYear() === now.getFullYear()
  ) {
    return `${input.getHours()}:${String(input.getMinutes()).padStart(2, '0')}`;
  }

  // Check if it's yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (
    input.getDate() === yesterday.getDate() &&
    input.getMonth() === yesterday.getMonth() &&
    input.getFullYear() === yesterday.getFullYear()
  ) {
    return 'Yesterday';
  }

  // Check if it's within the last week
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);

  if (input > oneWeekAgo) {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return dayNames[input.getDay()];
  }

  // Default to DD/MM/YYYY format for older dates
  return formatDate(input);
};

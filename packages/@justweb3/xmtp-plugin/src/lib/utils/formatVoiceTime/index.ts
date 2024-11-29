export const formatTime = (timeSeconds: number) => {
  if (Number.isFinite(timeSeconds)) {
    const date = new Date(timeSeconds * 1000);
    const minutes = date.getUTCMinutes();
    const mins = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = date.getUTCSeconds();
    const secs = seconds < 10 ? `0${seconds}` : seconds;
    return `${mins}:${secs}`;
  } else {
    return '00:00';
  }
};

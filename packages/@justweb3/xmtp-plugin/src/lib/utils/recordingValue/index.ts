import type { StatusMessages } from 'react-media-recorder-2';

export const getRecordingValue = (
  status: StatusMessages,
  minutes: number,
  seconds: number
): string | null =>
  status === 'recording'
    ? `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`
    : null;

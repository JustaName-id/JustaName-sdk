import { useEffect } from "react";
import type { StatusMessages } from "react-media-recorder-2";
import { useStopwatch } from "react-timer-hook";
import { getRecordingValue } from "../../utils/recordingValue";

interface useRecordingTimerProps {
  stopRecording: () => void;
  status: StatusMessages;
}

export const useRecordingTimer = ({
  stopRecording,
  status,
}: useRecordingTimerProps) => {

  const { start, pause, minutes, seconds, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (minutes === 10) {
      stopRecording();
      pause();
    }
  }, [stopRecording, pause, minutes]);

  useEffect(() => {
    if (status === "idle") {
      reset();
      pause();
    }
  }, [status, pause, reset])

  const recordingValue = getRecordingValue(
    status,
    minutes,
    seconds,
  );

  return {
    start,
    pause,
    reset,
    recordingValue,
  };
};

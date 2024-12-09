import { CloseIcon, Flex, P, PauseIcon, PlayIcon } from '@justweb3/ui';
import React, { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../../../../utils/formatVoiceTime';
import { useGetAudioDuration } from '../../../../../hooks/useGetAudioDuration';

interface VoiceNoteRecordingProps {
  audioUrl: string;
  onCancel: () => void;
}

export const VoiceNoteRecording: React.FC<VoiceNoteRecordingProps> = ({
  audioUrl,
  onCancel,
}) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio());

  const audioDuration = useGetAudioDuration(audioUrl);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    audio.src = audioUrl;
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <Flex
      direction="row"
      align="center"
      justify="space-between"
      gap="10px"
      style={{
        background: 'var(--justweb3-primary-color)',
        padding: '5px',
        borderRadius: '100px',
      }}
    >
      {playing ? (
        <PauseIcon
          fill="white"
          width={22}
          height={22}
          style={{
            cursor: 'pointer',
          }}
          onClick={handlePlayPause}
        />
      ) : (
        <PlayIcon
          fill="white"
          width={22}
          height={22}
          style={{
            cursor: 'pointer',
          }}
          onClick={handlePlayPause}
        />
      )}
      <P
        style={{
          fontWeight: 900,
          fontSize: '12px',
          lineHeight: '73%',
          color: 'white',
          letterSpacing: '0.7px',
        }}
      >
        {playing || currentTime > 0
          ? formatTime(currentTime)
          : formatTime(audioDuration ?? 0)}
      </P>
      <CloseIcon
        width={18}
        height={18}
        fill="white"
        style={{
          cursor: 'pointer',
        }}
        onClick={onCancel}
      />
    </Flex>
  );
};

export default VoiceNoteRecording;

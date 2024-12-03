import { Flex, P, PauseIcon, PlayIcon } from '@justweb3/ui';
import * as Slider from '@radix-ui/react-slider';
import { DecodedMessage } from '@xmtp/xmtp-js';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useGetAudioDuration from '../../hooks/useGetAudioDuration';
import { MessageWithReaction } from '../../utils/filterReactionsMessages';
import { formatTime } from '../../utils/formatVoiceTime';

interface VoiceMessageCardProps {
  message: MessageWithReaction | DecodedMessage;
  style?: React.CSSProperties;
  disabled?: boolean;
  isReceiver: boolean;
}

const VoiceMessageCard: React.FC<VoiceMessageCardProps> = ({
  message,
  style,
  disabled,
  isReceiver,
}) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(new Audio());

  const audioUrl = useMemo(() => {
    const blob = new Blob([message.content.data], {
      type: message.content.mimeType,
    });
    return URL.createObjectURL(blob);
  }, [message.content]);

  const duration = useGetAudioDuration(audioUrl);

  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    audio.src = audioUrl;
    audio.preload = 'metadata';
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [message.content, audioUrl]);

  const handlePlayPause = () => {
    if (disabled) return;
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      setPlaying(false);
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
      audio.play();
      setPlaying(true);
    } else {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <Flex
      direction="row"
      align="flex-start"
      justify="space-between"
      gap="5px"
      style={{
        width: '200px',
        padding: '5px',
        ...style,
      }}
    >
      {playing ? (
        <PauseIcon
          width="24"
          height="24"
          fill={
            isReceiver
              ? 'var(--justweb3-primary-color)'
              : 'var(--justweb3-foreground-color-4)'
          }
          style={{
            cursor: 'pointer',
            scale: '1.5',
            width: '24px',
            height: '24px',
          }}
          onClick={handlePlayPause}
        />
      ) : (
        <PlayIcon
          width="22"
          height="22"
          fill={
            disabled ?
              'var(--justweb3-primary-color)'
              :
              isReceiver
                ? 'var(--justweb3-primary-color)'
                : 'var(--justweb3-foreground-color-4)'
          }
          style={{
            cursor: 'pointer',
            scale: '1.5',
            width: '24px',
            height: '24px',
          }}
          onClick={handlePlayPause}
        />
      )}
      <Flex
        direction="column"
        gap="5px"
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <Slider.Root
          disabled={disabled}
          style={{
            width: '100%',
            height: '5px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
          onValueChange={handleSliderChange}
          defaultValue={[0]}
          value={[
            playing || currentTime > 0 ? audioRef.current.currentTime : 0,
          ]}
          max={duration ?? 0}
          step={0.01}
        >
          <Slider.Track
            style={{
              background: !isReceiver
                ? 'var(--justweb3-primary-color)'
                : 'var(--justweb3-foreground-color-4)',
              height: '5px',
              borderRadius: '1000px',
              border: isReceiver
                ? '0.5px solid var(--justweb3-primary-color)'
                : '0.5px solid var(--justweb3-foreground-color-4)',
              flexGrow: 1,
            }}
          >
            <Slider.Range
              style={{
                background: isReceiver
                  ? 'var(--justweb3-primary-color)'
                  : 'var(--justweb3-foreground-color-4)',
                height: '100%',
                borderRadius: '1000px',
                position: 'absolute',
              }}
            />
          </Slider.Track>
          <Slider.Thumb
            style={{
              width: '6px',
              height: '5px',
              background: isReceiver
                ? 'var(--justweb3-primary-color)'
                : 'var(--justweb3-foreground-color-4)',
              borderRadius: '2.5px',
              display: 'block',
            }}
            aria-label="Volume"
          />
        </Slider.Root>
        <Flex direction="row" align="center" justify='space-between'>
          <P style={{
            fontSize: '9px',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: !isReceiver ? 'var(--justweb3-foreground-color-4)' : 'var(--justweb3-foreground-color-2)',
            opacity: '0.5',
          }}>{playing || currentTime > 0 ? formatTime(currentTime) : formatTime(duration ?? 0)}</P>

        </Flex>
      </Flex>
    </Flex>
  );
};

export default VoiceMessageCard;

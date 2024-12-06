import { DownloadIcon, Flex, PauseIcon, PlayIcon } from '@justweb3/ui';
import React, { useEffect, useRef, useState } from 'react';

export interface VideoPlayerPreviewProps {
  style?: React.CSSProperties;
  url?: string;
  disabled?: boolean;
  fileName?: string;
}

export const VideoPlayerPreview: React.FC<VideoPlayerPreviewProps> = ({
  style,
  url = '',
  disabled,
  fileName,
}) => {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const togglePlay = () => {
    if (disabled) return;
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && playing && videoRef.current) {
        videoRef.current.pause();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (videoRef.current && playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    };
  }, [playing]);

  return (
    <Flex
      justify="center"
      align="center"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={togglePlay}
      style={{
        aspectRatio: '16/9',
        position: 'relative',
        // TODO: check background color
        background: 'var(--justweb3-background-color)',
        cursor: 'pointer',
        borderRadius: '10px',
        border: '1px solid var(--justweb3-primary-color)',
        ...style,
      }}
    >
      <video
        ref={videoRef}
        controlsList="nodownload noplaybackrate noremoteplayback"
        src={url}
        autoPlay={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      {hovered && playing && (
        <div
          style={{
            position: 'absolute',
          }}
        >
          <PauseIcon width={40} height={40} />
        </div>
      )}
      {!playing && (
        <Flex
          align="center"
          direction="row"
          style={{
            position: 'absolute',
          }}
        >
          <PlayIcon width={40} height={40} />
          {!!fileName && (
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                transform: 'translateY(2px)',
              }}
              href={url}
              download={fileName}
            >
              <DownloadIcon width="29" height="29" />
            </a>
          )}
        </Flex>
      )}
    </Flex>
  );
};

import { Flex, P, PauseIcon, PlayIcon, CloseIcon } from '@justweb3/ui';
import { formatTime } from '../../utils/formatVoiceTime';
import React, { useEffect, useRef, useState } from 'react';
import useGetAudioDuration from '../../hooks/useGetAudioDuration';


interface CustomVoicePreviewProps {
    audioUrl: string;
    onCancel: () => void;
}

const CustomVoicePreview: React.FC<CustomVoicePreviewProps> = ({
    audioUrl,
    onCancel
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
        <Flex direction="row" align="center" justify='space-between' gap='10px' style={{
            height: '32px',
            background: 'var(--justweb3-primary-color)',
            padding: '5px 10px',
            borderRadius: '6px',
        }} >
            {playing ?
                <PauseIcon width={24} height={24} style={{
                    cursor: 'pointer',
                }} onClick={handlePlayPause} />
                :
                <PlayIcon width={24} height={24} style={{
                    cursor: 'pointer',
                }} onClick={handlePlayPause} />
            }
            <P style={{
                fontWeight: 900,
                fontSize: '14px',
                lineHeight: '73%',
                // TODO: check color
                color: 'var(--justweb3-text-color)',
                letterSpacing: '0.7px',
            }} >{playing || currentTime > 0 ? formatTime(currentTime) : formatTime(audioDuration ?? 0)}</P>
            <CloseIcon width={20} height={20} fill="#8714E3" style={{
                cursor: 'pointer',
                scale: '1.1',
            }} onClick={onCancel} />
        </Flex>
    );
};

export default CustomVoicePreview;

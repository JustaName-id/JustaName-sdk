import * as Slider from '@radix-ui/react-slider';
import { DecodedMessage } from '@xmtp/xmtp-js';
import { Flex, P, PauseIcon, PlayIcon } from '@justweb3/ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageWithReaction } from '../../utils/filterReactionsMessages';
import useGetAudioDuration from '../../hooks/useGetAudioDuration';
import { formatTime } from '../../utils/formatVoiceTime';


interface VoiceMessageCardProps {
    message: MessageWithReaction | DecodedMessage;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const VoiceMessageCard: React.FC<VoiceMessageCardProps> = ({
    message,
    style,
    disabled
}) => {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(new Audio());


    const audioUrl = useMemo(() => {
        const blob = new Blob([message.content.data], { type: message.content.mimeType });
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
        <Flex direction="row" align="center" justify="space-between" gap='10px' style={{
            width: "200px",
            padding: "5px 0",
            ...style
        }}>
            {playing ? (
                <PauseIcon width="22" height="22" style={{
                    cursor: 'pointer',
                    scale: '1.5',
                    width: '24px',
                    height: '24px'
                }} onClick={handlePlayPause} />
            ) : (
                <PlayIcon width="22" height="22" style={{
                    cursor: 'pointer',
                    scale: '1.5',
                }} onClick={handlePlayPause} />
            )}
            <Flex direction='column' gap='5px' style={{
                flex: 1
            }}>
                <P style={{
                    fontSize: "10px",
                    fontWeight: 400,
                    lineHeight: "100%",
                    color: "var(--justweb3-text-color)",
                    textTransform: "uppercase"
                }}>{playing || currentTime > 0 ? formatTime(currentTime) : formatTime(duration ?? 0)}</P>
                <Slider.Root disabled={disabled} style={{
                    width: "100%",
                    height: "5px",
                    position: "relative",
                    display: 'flex',
                    alignItems: 'center'
                }} onValueChange={handleSliderChange} defaultValue={[0]} value={[playing || currentTime > 0 ? audioRef.current.currentTime : 0]} max={duration ?? 0} step={0.01}>
                    <Slider.Track style={{
                        backgroundColor: "white",
                        height: "5px",
                        borderRadius: "1000px",
                        border: "0.5px solid var(--justweb3-border-unfocused)",
                        flexGrow: 1
                    }} >
                        <Slider.Range style={{
                            backgroundColor: "var(--justweb3-primary-color)",
                            height: "100%",
                            position: "absolute"
                        }} />
                    </Slider.Track>
                    <Slider.Thumb style={{
                        width: "8px",
                        height: "5px",
                        backgroundColor: "var(--justweb3-primary-color)",
                        borderRadius: "2.5px",
                        display: 'block'
                    }} aria-label="Volume" />
                </Slider.Root>
            </Flex>
        </Flex>
    );
};

export default VoiceMessageCard;

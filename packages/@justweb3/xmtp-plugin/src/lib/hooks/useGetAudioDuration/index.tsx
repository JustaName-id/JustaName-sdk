import { useEffect, useState } from 'react';

export const useGetAudioDuration = (url: string) => {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!url) {
      setDuration(null);
      return;
    }

    const getDuration = (url: string, next: (duration: number) => void) => {
      const _player = new Audio(url);
      const durationChangeHandler = function (
        this: HTMLAudioElement,
        e: Event
      ) {
        if (this.duration !== Infinity) {
          const duration = this.duration;
          _player.remove(); // Cleanup
          next(duration);
        }
      };

      _player.addEventListener('durationchange', durationChangeHandler, false);
      _player.load();
      _player.currentTime = 24 * 60 * 60;
      _player.volume = 0;
    };

    getDuration(url, (duration: number) => {
      setDuration(duration);
    });

    return () => {
      const _player = new Audio(url);
      _player.remove();
    };
  }, [url]);

  return duration;
};

export default useGetAudioDuration;

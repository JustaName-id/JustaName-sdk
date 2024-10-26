import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Carousel.module.css'; // Import CSS module

interface CarouselProps {
  slides: React.ReactNode[];
  autoPlaySpeed?: number;
  autoPlay?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlaySpeed = 5000,
  autoPlay = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(autoPlay);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const nextSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (autoPlayEnabled && emblaApi) {
      const intervalId = setInterval(() => {
        nextSlide();
      }, autoPlaySpeed);

      return () => {
        clearInterval(intervalId);
      };
    }
    return undefined;
  }, [emblaApi, autoPlayEnabled, autoPlaySpeed, nextSlide]);

  const handleMouseEnter = () => {
    setAutoPlayEnabled(false);
  };

  const handleMouseLeave = () => {
    setAutoPlayEnabled(autoPlay);
  };

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              <div className={styles.slideInner}>{slide}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === selectedIndex ? styles.dotSelected : ''
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

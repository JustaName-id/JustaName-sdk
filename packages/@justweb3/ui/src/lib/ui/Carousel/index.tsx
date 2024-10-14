import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styled from 'styled-components'

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
`

const Viewport = styled.div`
    overflow: hidden;
    padding-right: 10px;
`

const Container = styled.div`
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
    margin-left: -10px; /* Negative margin to offset slide padding */
`

const Slide = styled.div`
    position: relative;
    min-width: 100%;
    padding-left: 10px; /* Add padding to create space between slides */
`

const SlideInner = styled.div`
    position: relative;
    overflow: hidden;
    height: 100%;
`

const DotsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`

const Dot = styled.button<{ isSelected: boolean }>`
    background-color: ${props => props.isSelected ? 'var(--justweb3-primary-color)' : 'transparent'};
    border: 1px solid var(--justweb3-primary-color);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    padding: 0;
    cursor: pointer;
`

interface CarouselProps {
  slides: React.ReactNode[]
  autoPlaySpeed?: number
  autoPlay?: boolean
}

export const Carousel: React.FC<CarouselProps> = ({
                                                    slides,
                                                    autoPlaySpeed = 5000,
                                                    autoPlay = true
                                                  }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps'
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(autoPlay)

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  const nextSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (autoPlayEnabled && emblaApi) {
      const intervalId = setInterval(() => {
        nextSlide()
      }, autoPlaySpeed)

      return () => {
        clearInterval(intervalId)
      }
    }

    return undefined
  }, [emblaApi, autoPlayEnabled, autoPlaySpeed, nextSlide])

  const handleMouseEnter = () => {
    setAutoPlayEnabled(false)
  }

  const handleMouseLeave = () => {
    setAutoPlayEnabled(autoPlay)
  }

  return (
    <CarouselContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Viewport ref={emblaRef}>
        <Container>
          {slides.map((slide, index) => (
            <Slide key={index}>
              <SlideInner>{slide}</SlideInner>
            </Slide>
          ))}
        </Container>
      </Viewport>
      <DotsContainer>
        {slides.map((_, index) => (
          <Dot
            key={index}
            isSelected={index === selectedIndex}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </DotsContainer>
    </CarouselContainer>
  )
}
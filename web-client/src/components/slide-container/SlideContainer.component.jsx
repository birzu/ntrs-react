import React, { useState, useCallback, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

import UIButton from '../core-ui/button/UIButton';

import './SlideContainer.styles.scss';

const SLIDE_DATA = [
  {
    key: 0,
    title: 'Explore out most popular tours',
    text:
      'Explore our most popular and most reviewed tours, with over 300 members and 200 reviews.'
  },
  {
    key: 1,
    title: 'Start your new adventure',
    text:
      'Explore the best new experiences prepared by experts for you and bring a yourself a step closer to nature.'
  }
];

const Slide = ({ idx, id, title, text, style }) => {
  return (
    <animated.div id={id} className={`slide slide--${idx}`} style={style}>
      <h2 className="slide__heading heading-2--secondary">{title}</h2>
      <p className="slide__text">{text}</p>
      <UIButton modifier="success">
        Learn More <span>&#10142;</span>
      </UIButton>
    </animated.div>
  );
};

const SlideNavigation = ({ nextSlide, prevSlide, currentSlide }) => {
  return (
    <div className="slide-navigation">
      <div
        className={`slide-navigation__prev ${
          currentSlide === 0 ? 'slide-navigation--current-slide' : ''
        }`}
        onClick={prevSlide}
      ></div>
      <div
        className={`slide-navigation__next ${
          currentSlide === 1 ? 'slide-navigation--current-slide' : ''
        }`}
        onClick={nextSlide}
      ></div>
    </div>
  );
};

const SlideContainer = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const fade = useTransition(SLIDE_DATA[slideIndex], item => item.key, {
    from: { opacity: 1, transform: 'translateX(10%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(-2%)' },
    config: { mass: 1, tension: 240, friction: 27 }
  });

  const nextSlide = useCallback(() => setSlideIndex(1), []);
  const prevSlide = useCallback(() => setSlideIndex(0), []);

  useEffect(() => {
    const loop = setInterval(() => setSlideIndex(i => (i + 1) % 2), 3800);
    return () => clearInterval(loop);
  }, []);

  return (
    <section className="section-slides">
      <SlideNavigation
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        currentSlide={slideIndex}
      />
      <div className="slide-container">
        {fade.map(
          ({ item, props, key }) =>
            item && (
              <Slide
                idx={slideIndex}
                key={key}
                text={item.text}
                title={item.title}
                style={props}
              />
            )
        )}
      </div>
    </section>
  );
};
export default SlideContainer;

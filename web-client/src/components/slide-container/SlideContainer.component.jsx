import React, { useState, useCallback } from 'react';

import UIButton from '../core-ui/button/UIButton';

import './SlideContainer.styles.scss';

const SLIDE_DATA = [
  {
    title: 'Explore out most popular tours',
    text:
      'Explore our most popular and most reviewed tours, with over 300 members and 200 reviews.'
  },
  {
    title: 'Start your new adventure',
    text:
      'Explore the best new experiences prepared by experts for you and bring a yourself a step closer to nature.'
  }
];

const Slide = ({ idx, id, title, text, style }) => {
  return (
    <div id={id} className={`slide slide--${idx}`} style={style}>
      <h2 className="slide__heading heading-2--secondary">{title}</h2>
      <p className="slide__text">{text}</p>
      <UIButton modifier="success">
        Learn More <span>&#10142;</span>
      </UIButton>
    </div>
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => setCurrentSlide(1), [setCurrentSlide]);

  const prevSlide = useCallback(() => setCurrentSlide(0), [setCurrentSlide]);

  return (
    <section className="section-slides">
      <SlideNavigation
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
      <div className="slide-container">
        {SLIDE_DATA.map((slide, idx) => (
          <Slide
            id={`slide-${idx}`}
            idx={idx}
            key={idx}
            text={slide.text}
            title={slide.title}
            style={{ opacity: `${currentSlide === idx ? 1 : 0}` }}
          />
        ))}
      </div>
    </section>
  );
};
export default SlideContainer;

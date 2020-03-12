import React from 'react';

import UIButton from '../core-ui/button/UIButton';

import './SlideContainer.styles.scss';

const Slide = ({ idx, id }) => {
  return (
    <div id={id} className={`slide slide--${idx}`}>
      <h2 className="slide__heading heading-2--secondary">
        Explore our most popular tours
      </h2>
      <p className="slide__text">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </p>
      <UIButton modifier="success">
        Learn More <span>&#10142;</span>
      </UIButton>
    </div>
  );
};

const SlideContainer = () => {
  return (
    <section className="section-slides">
      <div className="slide-container">
        <Slide idx={1} id="slide-1" />
        <Slide idx={2} id="slide-2" />
      </div>
    </section>
  );
};
export default SlideContainer;

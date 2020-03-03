import React from 'react';
import Img1 from '../../assets/mountain-hiker_1.jpg';
import Img2 from '../../assets/sports-lover-1.jpg';
import Img3 from '../../assets/sea-exlorer_2.jpg';

import './SectionAbout.styles.scss';

const SectionAbout = () => {
  return (
    <section className="section-about">
      <h2 className="section-about__heading heading-2 u-mb-md">
        Exciting tours for adventurous people
      </h2>
      <div className="section-about__details">
        <h3 className="para-heading heading-3 u-mb-sm">
          Experience Adventure like you have never before
        </h3>
        <p className="section-about__para section-about__para--1">
          Whether you like to ride the waves of the sea or to chase the heights
          of the mountains. Natours provides all kinds of tours across the whole
          country and we will make sure that you will have an amazing experience
          on the tour living one of the best moments of your life.
        </p>
      </div>
      <div className="section-about__gallery">
        <div className="gallery__img-box gallery__img-box--1">
          <img
            className="gallery__img gallery__img--1"
            src={Img1}
            alt="tourists hiking"
          ></img>
        </div>
        <div className="gallery__img-box gallery__img-box--2">
          <img
            className="gallery__img gallery__img--2"
            src={Img2}
            alt="tourists surfing"
          ></img>
        </div>
        <div className="gallery__img-box gallery__img-box--3">
          <img
            className="gallery__img gallery__img--3"
            src={Img3}
            alt="tourists on boat"
          ></img>
        </div>
      </div>
    </section>
  );
};

export default SectionAbout;

import React from 'react';

import CustomButton from '../custom-button/CustomButton.component';

import Img1 from '../../assets/mountain-hiker_1.jpg';
import Img2 from '../../assets/sports-lover-1.jpg';
import Img3 from '../../assets/sea-exlorer_2.jpg';

import './SectionAbout.styles.scss';

const SectionAbout = () => {
  return (
    <section className="section-about">
      <h2 className="section-about__heading heading-2 u-mb-sm">
        Exciting tours for adventurous people
      </h2>
      <div className="section-about__details-wrapper">
        <div className="section-about__details section-about__details--1">
          <h3 className="para-heading heading-3 u-mb-xm">
            Experience Adventure like you have never before
          </h3>
          <p className="section-about__para section-about__para--1">
            Whether you like to ride the waves of the sea or to chase the
            heights of the mountains. Natours provides all kinds of tours across
            the whole country and we will make sure that you will have an
            amazing experience on the tour living one of the best moments of
            your life.
          </p>
        </div>
        <div className="section-about__details section-about__details--2">
          <h3 className="para-heading heading-3 u-mb-xm">
            You're going to fall in love with nature
          </h3>
          <p className="section-about__para section-about__para--2">
            Enjoy the eternal beauty of nature and live on a happy life. Join
            the community, your next breathtaking adventure awaits you.
          </p>
          <CustomButton cls="ntrs-btn ntrs-btn--secondary section-about__btn">
            Sign up now<span className="section-about__btn-span">&rarr;</span>
          </CustomButton>
        </div>
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

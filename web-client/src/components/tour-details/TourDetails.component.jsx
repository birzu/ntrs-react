import React from 'react';

import SvgIconSelector from '../svg-icon-selector/SvgIconSelector.component';

import './TourDetails.styles.scss';

import Img1 from '../../assets/sports-lover-1.jpg';
import Img2 from '../../assets/mountain-hiker_1.jpg';
import Img3 from '../../assets/hero.jpg';
import GuideImg from '../../assets/user-10.jpg';
import GuideImg2 from '../../assets/user-12.jpg';

const TourImgGallery = () => {
  return (
    <section className="section-tour-details">
      <div className="section-tour-details__head">
        <div className="tour-guides">
          <h3 className="tour-guides__heading u-mb-sm">Your Tour Guides</h3>
          <div className="tour-guides__guide-container">
            <div className="tour-guides__guide">
              <img
                className="tour-guides__guide-img"
                src={GuideImg2}
                alt="guide"
              ></img>
              <p className="tour-guides__guide-role">Lead Guide</p>
              <p className="tour-guides__guide-name">Mark Robinson</p>
            </div>
          </div>
          <div className="tour-guides__guide-container">
            <div className="tour-guides__guide">
              <img
                className="tour-guides__guide-img"
                src={GuideImg}
                alt="guide"
              ></img>
              <p className="tour-guides__guide-role">Tour Guide</p>
              <p className="tour-guides__guide-name">John Doe</p>
            </div>
          </div>
          <div className="tour-guides__guide-container">
            <div className="tour-guides__guide">
              <img
                className="tour-guides__guide-img"
                src={GuideImg}
                alt="guide"
              ></img>
              <p className="tour-guides__guide-role">Tour Guide</p>
              <p className="tour-guides__guide-name">John Doe</p>
            </div>
          </div>
        </div>
        <div className="tour-locations">
          <h3 className="tour-locations__heading u-mb-sm">
            Places you will be visiting
          </h3>
          <div className="tour-locations__loc-container">
            <p className="tour-locations__loc">
              <SvgIconSelector cls="tour-locations__ic" icName="flag" />
              Point Dume Beach
            </p>
            <p className="tour-locations__loc">
              <SvgIconSelector cls="tour-locations__ic" icName="flag" />
              Venice Skate Park
            </p>
            <p className="tour-locations__loc">
              <SvgIconSelector cls="tour-locations__ic" icName="flag" />
              San Diego Skydive
            </p>
            <p className="tour-locations__loc">
              <SvgIconSelector cls="tour-locations__ic" icName="flag" />
              Kern River Raftingh
            </p>
            <p className="tour-locations__loc">
              <SvgIconSelector cls="tour-locations__ic" icName="flag" />
              Yosemite National Park
            </p>
          </div>
        </div>
      </div>
      {/**
				<div className="tour-img-gallery__body">
        <div className="img-gallery">
          <div className="img-gallery__img-container">
            <img src={Img1} className="img-gallery__img"></img>
          </div>
          <div className="img-gallery__img-container">
            <img src={Img2} className="img-gallery__img"></img>
          </div>
          <div className="img-gallery__img-container">
            <img src={Img3} className="img-gallery__img"></img>
          </div>
        </div>
      </div>
			  */}
    </section>
  );
};

export default TourImgGallery;

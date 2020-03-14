import React from 'react';

import SvgIconSelector from '../svg-icon-selector/SvgIconSelector.component';
import ReviewContainer from '../review-stars-container/ReviewContainer.component';
import UIButton from '../core-ui/button/UIButton';

import GuideImg from '../../assets/user-10.jpg';
import GuideImg2 from '../../assets/user-12.jpg';
import TourImg from '../../assets/forest-hiker.jpg';
import './TourQuickSummary.styles.scss';

const TourQuickSummary = () => (
  <section className="tour-quick-summary">
    <div className="quick-summary">
      <div className="quick-summary__img-wrapper">
        <img className="quick-summary__img" src={TourImg} alt="tour-img"></img>
      </div>
      <h3 className="quick-summary__title">
        Exquisite wines, scenic views, exclusive barrel tastings, and much more
      </h3>
      <div className="quick-summary__content">
        <div className="quick-summary__item-group">
          <div className="quick-summary__item">
            <div className="quick-summary__item-des">
              <SvgIconSelector cls="quick-summary__icon" icName="calendar" />
              <span>Next Date</span>
            </div>
            <p className="quick-summary__item-val">28 Jul 2021</p>
          </div>
          <div className="quick-summary__item">
            <div className="quick-summary__item-des">
              <SvgIconSelector cls="quick-summary__icon" icName="trending-up" />
              <span>Difficulty</span>
            </div>
            <p className="quick-summary__item-val">Medium</p>
          </div>
          <div className="quick-summary__item">
            <div className="quick-summary__item-des">
              <SvgIconSelector cls="quick-summary__icon" icName="flag" />
              <span>Stops</span>
            </div>
            <p className="quick-summary__item-val">12</p>
          </div>
          <div className="quick-summary__item">
            <div className="quick-summary__item-des">
              <SvgIconSelector cls="quick-summary__icon" icName="user" />
              <span>Group size</span>
            </div>
            <p className="quick-summary__item-val">15 person group</p>
          </div>

          <div className="quick-summary__item">
            <div className="quick-summary__item-des">
              <SvgIconSelector cls="quick-summary__icon" icName="star" />
              <span>Rating</span>
            </div>
            <ReviewContainer size="md" rating={4.5} />
          </div>
        </div>
        <div className="quick-summary__tour-guides">
          <p className="quick-summary__temp-details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
            feugiat diam. Integer posuere nulla at nunc semper sagittis. Donec
            elementum nisl a erat fermentum vehicula. Nullam scelerisque lacus
            non felis blandit, nec porttitor elit convallis. Mauris eleifend
            eget sapien in viverra. Suspendisse et porta arcu.
          </p>

          <UIButton modifier="secondary" style={{ marginTop: 'auto' }}>
            Book now !
          </UIButton>
          {/*
    <div className="quick-summary__guide">
            <img
              className="quick-summary__guide-img"
              src={GuideImg}
              alt="tour guide"
            ></img>
            <p className="quick-summary__guide-role">Lead Guide</p>
            <p className="quick-summary__guide-name">Ben Hardley</p>
          </div>
       
					*/}
          {/*<div className="quick-summary__guide">
            <img
              className="quick-summary__guide-img"
              src={GuideImg2}
              alt="tour guide"
            ></img>
            <p className="quick-summary__guide-role">Tour Guide</p>
            <p className="quick-summary__guide-name">Kate Morrison </p>
</div> */}
        </div>
      </div>
    </div>
  </section>
);

export default TourQuickSummary;

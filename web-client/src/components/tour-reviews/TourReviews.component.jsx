import React from 'react';

import ReviewContainer from '../review-stars-container/ReviewContainer.component';

import './TourReviews.styles.scss';
import Img from '../../assets/user-12.jpg';
import Img2 from '../../assets/user-10.jpg';

const TourReviews = () => {
  return (
    <section className="section-tour-reviews">
      <div className="tour-reviews-container">
        <div className="featured-review">
          <h2 className="featured-review__heading">Featured Review</h2>
          <div className="featured-review__author">John Doe</div>
          <ReviewContainer rating={4.9} cls="featured-review__stars" />
          <img
            className="featured-review__author-img"
            src={Img2}
            alt="review author"
          ></img>
          <p className="featured-review__meta">
            Last updated: <span>{new Date().toISOString()}</span>
          </p>

          <p className="featured-review__review-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
            feugiat diam. Integer posuere nulla at nunc semper sagittis. Donec
            elementum nisl a erat fermentum vehicula. Nullam scelerisque lacus
            non felis
          </p>
        </div>
        <div className="tour-review-wrapper">
          <h2 className="tour-review-wrapper__heading">All reviews</h2>
          <div className="tour-review">
            <h3 className="tour-review__author">John Doe</h3>
            <ReviewContainer size="md" rating={4.7} cls="tour-review__stars" />
            <img
              className="tour-review__author-img"
              src={Img}
              alt="review author"
            ></img>
            <p className="tour-review__meta">
              Last updated: <span>{new Date().toISOString()}</span>
            </p>
            <p className="tour-review__review-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
              feugiat diam. Integer posuere nulla at nunc semper sagittis. Donec
              elementum nisl a erat fermentum vehicula. Nullam scelerisque lacus
              non felis
            </p>
          </div>
          <div className="tour-review">
            <h3 className="tour-review__author">John Doe</h3>
            <ReviewContainer size="md" rating={4.7} />
            <img
              className="tour-review__author-img"
              src={Img}
              alt="review author"
            ></img>
            <p className="tour-review__meta">
              Last updated: <span>{new Date().toISOString()}</span>
            </p>
            <p className="tour-review__review-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
              feugiat diam. Integer posuere nulla at nunc semper sagittis. Donec
              elementum nisl a erat fermentum vehicula. Nullam scelerisque lacus
              non felis
            </p>
          </div>
          <div className="tour-review">
            <h3 className="tour-review__author">John Doe</h3>
            <ReviewContainer size="md" rating={4.7} />
            <img
              className="tour-review__author-img"
              src={Img}
              alt="review author"
            ></img>
            <p className="tour-review__meta">
              Last updated: <span>{new Date().toISOString()}</span>
            </p>
            <p className="tour-review__review-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
              feugiat diam. Integer posuere nulla at nunc semper sagittis. Donec
              elementum nisl a erat fermentum vehicula. Nullam scelerisque lacus
              non felis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourReviews;

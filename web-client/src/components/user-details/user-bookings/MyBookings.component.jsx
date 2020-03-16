import React from 'react';

import TourImg from '../../../assets/sea-explorer-2.jpg';

import './MyBooking.styles.scss';

const UserBooking = () => {
  return (
    <div className="user-booking">
      <div className="user-booking__tour-img-wrapper">
        <img
          className="user-booking__tour-img"
          src={TourImg}
          alt="forest hiker tour"
        ></img>
      </div>
      <h3 className="user-booking__tour-name">The Forest Hiker</h3>
      <div className="user-booking__tour-start-date">
        <p>Start date:</p>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <h3 className="user-booking__tour-purchase-details">Purchase Details</h3>
      <div className="user-booking__details-box">
        <p className="user-booking__tour-price">Price </p>
        <p className="user-booking__tour-price-val">$799.00</p>
        <p className="user-booking__tour-discount">Discount</p>
        <p className="user-booking__tour-discount-val">10%</p>{' '}
        <p className="user-booking__tour-total">Total</p>
        <p className="user-booking__tour-total-val">$719.10</p>
      </div>
      <input
        type="button"
        value="Request cancel"
        className="user-booking__btn-cancel"
      />
    </div>
  );
};

const UserBookingContainer = () => {
  return (
    <div className="user-booking-container">
      <h2 className="user-booking-container__heading">My Bookings</h2>
      {new Array(2).fill(1).map(el => (
        <UserBooking />
      ))}
    </div>
  );
};

export default UserBookingContainer;

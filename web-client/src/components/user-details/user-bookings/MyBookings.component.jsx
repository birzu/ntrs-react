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
      <h3 className="user-booking__tour-name">The Forest hiker</h3>
      <div className="user-booking__tour-start-date">
        <p>Start date:</p>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <div className="user-booking__purchase-details">
        <p className="user-booking__tour-price">
          Price <span>$799.00</span>
        </p>
        <p className="user-booking__tour-discount">
          Discount <span>10%</span>
        </p>
        <p className="user-booking__tour-final-price">
          Total <span>$719.10</span>
        </p>
      </div>
      <input type="button" value="Request cancel" />
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

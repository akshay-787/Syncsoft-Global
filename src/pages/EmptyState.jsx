import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = () => {
  return (
    <div className="container">
      <div className="empty_box">
        <h2>Your movie list is empty</h2>
        <Link to="/add" className="btn btn_primary btn-block">
          Add a new movie
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;

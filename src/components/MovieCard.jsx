import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  
  return (
    <div className="col-lg-3 col-md-4 col-6">
      <div className="movie_card">
        <img src={movie.image || 'assets/img/movie-1.jpg'}  />
        <div className="movie_details">
          <h3 className="movie_name">{movie.movie_name}</h3>
          <div className="movie_year">{movie.movie_year}</div>
        </div>
        <div className="hover_content">
          <Link to={`/edit/${movie.id}`} className="btn btn_primary">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

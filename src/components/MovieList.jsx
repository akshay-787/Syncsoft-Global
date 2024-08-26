import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../pages/EmptyState';
import MovieCard from './MovieCard';
import { useUserData } from '../context/UserDataContext';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';

const MovieList = () => {
  
  const { movies } = useUserData();
  const { logout } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  if (!movies || movies.length === 0) {
    return <EmptyState />;
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className='row align-items-center my-5'>
        <div className='col-6'>
          <h3>My Movies<Link to="/add" className='ms-1'>
            <IoIosAddCircleOutline />
          </Link>
          </h3>
        </div>
        <div className='col-6 text-end'>
          <h4>Logout
            <FiLogOut className='ms-1' onClick={logout} />
          </h4>
        </div>
      </div>
      <div className="row">
        {currentMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className="pagination mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`btn ${index + 1 === currentPage ? 'btn btn_primary' : 'btn-outline-primary'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

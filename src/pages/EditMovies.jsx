import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserData } from '../context/UserDataContext';
import MovieForm from '../components/MovieForm';

const EditMovie = () => {
  const { id } = useParams();
  const { updateMovie, movies } = useUserData();
  const [movieToEdit, setMovieToEdit] = useState(null);

  useEffect(() => {
    const movie = movies.find(m => m.id === id);
    setMovieToEdit(movie);
  }, [id, movies]);

  if (!movieToEdit) return <p>Loading...</p>;

  return (
    <MovieForm
      initialValues={{
        title: movieToEdit.movie_name,
        year: movieToEdit.movie_year,
        image: null
      }}
      onSubmit={(movie, navigate) => updateMovie(id, movie, navigate)}
      submitButtonLabel="Edit"
      movieToEdit={movieToEdit}
    />
  );
};

export default EditMovie;

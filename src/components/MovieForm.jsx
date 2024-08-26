import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { uploadImage } from '../utils/upload';
import { FiDownload } from "react-icons/fi";

const MovieForm = ({ initialValues, onSubmit, submitButtonLabel, movieToEdit }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movieToEdit) {
      setValues({
        title: movieToEdit.movie_name,
        year: movieToEdit.movie_year,
        image: null
      });
    }
  }, [movieToEdit]);

  const validateForm = () => {
    const { title, year, image } = values;
    let isValid = true;
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!year) {
      newErrors.year = "Publishing year is required";
      isValid = false;
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = "Publishing year must be a valid 4-digit year";
      isValid = false;
    }

    if (!image && !movieToEdit?.image) {
      newErrors.image = "Movie image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setValues({ ...values, [name]: name === "image" ? files[0] : value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let imageURL = movieToEdit?.image || "";
      if (values.image) {
        imageURL = await uploadImage(values.image);
      }

      const movie = {
        movie_name: values.title,
        movie_year: values.year,
        image: imageURL,
      };

      await onSubmit(movie, navigate);
      setValues({ title: "", year: "", image: null });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-5">{submitButtonLabel} Movie</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="image-upload">
            <input
              type="file"
              id="imageUpload"
              name="image"
              onChange={handleChange}
              className="form-control file-input"
              style={{ display: 'none' }}
            />
            <label htmlFor="imageUpload" className="image-drop-area">
              <FiDownload />
              <p>Drop an image here</p>
            </label>
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          </div>
        </div>
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Title"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="form-group mb-5">
              <input
                type="text"
                id="year"
                name="year"
                value={values.year}
                onChange={handleChange}
                className={`form-control ${errors.year && "is-invalid"} publish_year`}
                placeholder="Publishing year"
              />
              {errors.year && <div className="invalid-feedback">{errors.year}</div>}
            </div>
            <div className="form-actions">
              <Link to="/" className="btn btn-outline_primary btn-block w-49">Cancel</Link>
              <button type="submit" className="btn btn_primary w-49">{submitButtonLabel}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;

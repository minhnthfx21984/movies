import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";

import classes from "./MovieList.module.css";
import MovieDetail from "../MovieDetail/MovieDetail";

const MovieList = (props) => {
  const [error, setError] = useState(null);
  const [listMovie, setListMovie] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [movieShowDetail, setMovieShowDetail] = useState(null);

  const listRef = useRef(null);

  // close detail when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        // outside
        setMovieShowDetail(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [movieShowDetail]);

  useEffect(() => {
    fetchData();
  }, []);

  // fetch data function
  const fetchData = () => {
    const response = axios
      .get(props.apiUrl)
      .then((response) => {
        const movies = response.data.results
          .filter((item) => item.backdrop_path !== null)
          .map((item) => (
            <MovieItem
              data={item}
              key={item.id}
              showDetail={showDetail}
              movieShowDetail={movieShowDetail}
              setMovieShowDetail={setMovieShowDetail}
              onShowDetail={showDetailHander}
              onHideDetail={hideDetailHander}
            />
          ));
        setListMovie(movies);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // error handler
  if (error) {
    console.log(error);
    return error;
  }

  const showDetailHander = () => {
    setShowDetail(true);
  };
  const hideDetailHander = () => {
    setShowDetail(false);
  };

  return (
    <section ref={listRef}>
      <div className={classes["movie-list"]}>{listMovie}</div>
      {movieShowDetail && <MovieDetail data={movieShowDetail} />}
    </section>
  );
};

export default MovieList;

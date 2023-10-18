import { useContext, useState } from "react";
import MovieContext from "../../context/movie-context";

import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
    const ctx = useContext(MovieContext);
    const imageSrc = `${ctx.imageUrl}${props.data.backdrop_path}`;

    const detailMovieHandler = () => {
        props.onShowDetail();
        props.setMovieShowDetail((prevState) => {
            return prevState === props.data ? null : props.data;
        });

        if (props.movieShowDetail === props.data) {
            props.onHideDetail();
        }
    };

    return (
        <>
            <div>
                <div className={classes["movie-item"]}>
                    <img src={imageSrc} onClick={detailMovieHandler} />
                </div>
            </div>
        </>
    );
};
export default MovieItem;

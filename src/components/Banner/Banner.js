import { useContext, useState, useEffect } from "react";
import MovieContext from "../../context/movie-context";
import axios from "axios";

import classes from "./Banner.module.css";

// text truncate
function TextTruncate(props) {
    if (props.children.length <= 140) {
        return <span>{props.children}</span>;
    }
    const truncatedText = props.children.substring(0, 140) + "...";
    return <span>{truncatedText}</span>;
}

const Banner = (props) => {
    const ctx = useContext(MovieContext);

    const [error, setError] = useState(null);

    const [bannerImageUrl, setBannerImageUrl] = useState(null);
    const [movieName, setMovieName] = useState(null);
    const [movieOverview, setMovieOverview] = useState(null);

    useEffect(() => {
        // fetch data
        fetchData();
    }, []);

    // fetch data function
    const fetchData = () => {
        const response = axios
            .get(ctx.netflixOriginals)
            .then((response) => {
                //filter error movie
                const bannerValid = response.data.results.filter((item) => item.backdrop_path !== null);

                // random movie
                const bannerMovie = bannerValid[Math.floor(Math.random() * bannerValid.length - 1)];

                // get image banner url
                setBannerImageUrl(`${ctx.imageUrl}${bannerMovie.backdrop_path}`);

                // get name movie
                setMovieName(bannerMovie.name);

                // get overview

                if (bannerMovie.overview.length <= 140) {
                    setMovieOverview(bannerMovie.overview);
                } else {
                    setMovieOverview(bannerMovie.overview.substring(0, 140) + "...");
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    let backgroundImage = "";
    if (bannerImageUrl === "https://image.tmdb.org/t/p/original/null") {
        backgroundImage = {
            backgroundImage: `url(./error.png)`,
        };
    } else {
        backgroundImage = {
            backgroundImage: !error ? `url(${bannerImageUrl})` : `url(./error.jpg)`,
        };
    }

    return (
        <>
            <section>
                <div className={classes["banner"]} style={backgroundImage}>
                    <div className={classes["banner-content"]}>
                        <h1 className={classes["banner-title"]}>{movieName}</h1>
                        <button className={classes["action-button"]}>Play</button>
                        <button className={classes["action-button"]}>My List</button>
                        <p className={classes["banner-description"]}>{movieOverview}</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Banner;

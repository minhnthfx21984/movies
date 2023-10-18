import { useContext, useState, useEffect } from "react";
import axios from "axios";
import MovieContext from "../../context/movie-context";
import classes from "./MovieDetail.module.css";
import Youtube from "react-youtube";

const MovieDetail = (props) => {
    const ctx = useContext(MovieContext);
    const [youtubeKey, setYoutubeKey] = useState("");

    useEffect(() => {
        if (props.data) {
            const options = {
                method: "GET",
                url: ctx.getVideo(props.data.id),
                params: { language: "en-US" },
                headers: ctx.headers,
            };

            axios
                .request(options)
                .then(function (response) {
                    const youtubeIds = response.data.results.filter(
                        (i) => i.site === "YouTube" && (i.type === "Trailer" || i.type === "Teaser")
                    );
                    setYoutubeKey(youtubeIds.reverse()[0]?.key || null);
                })
                .catch(function (error) {
                    console.error(error);
                    setYoutubeKey(null);
                });
        }
    }, [ctx, props.data]);

    const opts = {
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    };

    // default image when not found video
    let defaultImage = "";
    if (props.data?.backdrop_path !== null) {
        defaultImage = `${ctx.imageUrl}${props.data?.backdrop_path}`;
    } else {
        defaultImage = "./error.png";
    }

    console.log(props.data);

    return (
        <div className={classes["detail-container"]}>
            <div>
                <h1 className={classes["movie-name"]}>{props.data?.title || props.data?.name || props.data?.original_name}</h1>
                <div className={classes["divider"]}></div>
                <div className={classes["info"]}>
                    <div>Release Date: {props.data?.release_date || props.data?.first_air_date}</div>
                    <div>Vote: {props.data?.vote_average}</div>
                </div>
                <div className={classes["overview"]}>{props.data?.overview}</div>
            </div>
            <div>
                {youtubeKey ? (
                    <Youtube videoId={youtubeKey} opts={opts} />
                ) : (
                    <img className={classes["default-img"]} src={defaultImage} alt="Default Image" />
                )}
            </div>
        </div>
    );
};

export default MovieDetail;

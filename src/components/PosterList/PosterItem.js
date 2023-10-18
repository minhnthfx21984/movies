import { useContext, useState, useRef, useEffect } from "react";
import MovieContext from "../../context/movie-context";

import classes from "./PosterItem.module.css";

import MovieDetail from "../MovieDetail/MovieDetail";

const PosterItem = (props) => {
    const ctx = useContext(MovieContext);
    const imageSrc = `${ctx.imageUrl}${props.data.poster_path}`;
    const ref = useRef();

    const [showDetail, setShowDetail] = useState(false);
    const showDetailHandler = () => {
        setShowDetail((prevState) => !prevState);
    };

    // close detail when click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                // outside
                setShowDetail(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showDetail]);

    return (
        <>
            <div ref={ref}>
                <div className={classes["movie-item"]}>
                    <img src={imageSrc} onClick={showDetailHandler} />
                </div>
                <div>{showDetail && <MovieDetail data={props.data} />}</div>
            </div>
        </>
    );
};
export default PosterItem;

import { useContext } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import MovieList from "../../components/MovieList/MovieList";
import MovieContext from "../../context/movie-context";
import PosterList from "../../components/PosterList/PosterList";

import classes from "./Browse.module.css";

function Browse() {
    const ctx = useContext(MovieContext);

    return (
        <div className="app">
            <Navbar />
            <Banner />

            <div className={classes["container"]}>
                <div className={classes["pt-1"]}></div>
                <PosterList apiUrl={ctx.trending} />
                <div className={classes["pt-1"]}></div>
                <h2 className={classes["category-title"]}>Xu hướng</h2>
                <MovieList apiUrl={ctx.topRated} />
                <h2 className={classes["category-title"]}>Xếp hạng cao</h2>
                <MovieList apiUrl={ctx.actionMovies} />
                <h2 className={classes["category-title"]}>hành động</h2>
                <MovieList apiUrl={ctx.comedyMovies} />
                <h2 className={classes["category-title"]}>Hài</h2>
                <MovieList apiUrl={ctx.horrorMovies} />
                <h2 className={classes["category-title"]}>Kinh dị</h2>
                <MovieList apiUrl={ctx.romanceMovies} />
                <h2 className={classes["category-title"]}>Lãng mạng</h2>
                <MovieList apiUrl={ctx.documentaries} />
                <h2 className={classes["category-title"]}>Tài liệu</h2>
                <MovieList apiUrl={ctx.netflixOriginals} />
            </div>
        </div>
    );
}

export default Browse;

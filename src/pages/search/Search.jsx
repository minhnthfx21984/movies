import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Search.module.css";
import SearchIcon from "../../components/Navbar/SearchIcon";
import PosterItem from "../../components/PosterList/PosterItem";
import MovieContext from "../../context/movie-context";
import axios from "axios";

const Search = () => {
    const [listPoster, setListPoster] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(null);
    const [searched, setSearched] = useState(false);
    const searchRef = useRef();
    const ctx = useContext(MovieContext);

    const options = {
        method: "GET",
        url: ctx.searchUrl,
        params: { query: searchKey, language: "en-US" },
        headers: ctx.headers,
    };

    useEffect(() => {
        setLoading(true);
        axios
            .request(options)
            .then(function (response) {
                const poster = response.data.results
                    .filter((item) => item.poster_path !== null)
                    .map((item) => <PosterItem data={item} key={item.id} />);
                if (poster.length === 0) {
                    setListPoster(null);
                } else {
                    setListPoster(poster);
                }

                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                console.error(error);
            });
    }, [searching]);

    const searchHandler = (e) => {
        e.preventDefault();
        setSearching(searchKey);
        setSearched(true);
    };

    const resetHandler = (e) => {
        e.preventDefault();
        setSearchKey("");
        setSearching("");
        setSearched(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Thực hiện hành động khi người dùng nhấn phím "Enter" trong form
            event.preventDefault();
            searchHandler(event);
        }
    };

    const searchKeyChangeHandler = (e) => {
        setSearchKey(e.target.value);
    };

    return (
        <div className="app">
            <Navbar />
            <div className={classes["form-container"]}>
                <form className={classes["form"]} onKeyPress={handleKeyPress}>
                    <div className={classes["search"]}>
                        <input
                            className={classes["search-input"]}
                            id="search-input"
                            ref={searchRef}
                            value={searchKey}
                            onChange={searchKeyChangeHandler}
                        />
                        <label htmlFor="search-input">
                            <SearchIcon />
                        </label>
                    </div>
                    <div className={classes["divider"]}></div>
                    <div className={classes["action"]}>
                        <div>
                            <button className={classes["reset"]} onClick={resetHandler}>
                                RESET
                            </button>
                        </div>
                        <div>
                            <button className={classes["submit"]} onClick={searchHandler}>
                                SEARCH
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <h3 className={classes["name-page"]}>Search results</h3>
            <div className={classes["poster-container"]}>
                {loading ? <p>Loading...</p> : listPoster ? listPoster : searched ? "Movie not found..." : ""}
            </div>
        </div>
    );
};

export default Search;

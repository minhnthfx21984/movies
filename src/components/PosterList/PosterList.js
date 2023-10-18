import { useState, useEffect } from "react";
import axios from "axios";
import PosterItem from "./PosterItem";

import classes from "./PosterList.module.css";

const PosterList = (props) => {
    const [error, setError] = useState(null);
    const [listPoster, setListPoster] = useState([]);
    useEffect(() => {
        // fetch data
        fetchData();
    }, []);

    // fetch data function
    const fetchData = () => {
        const response = axios
            .get(props.apiUrl)
            .then((response) => {
                const poster = response.data.results
                    .filter((item) => item.poster_path !== null)
                    .slice(0, 10)
                    .map((item) => <PosterItem data={item} key={item.id} />);
                setListPoster(poster);
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

    return <section className={classes["poster-list"]}>{listPoster}</section>;
};

export default PosterList;

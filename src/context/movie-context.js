// MyContext.js
import React from "react";

const MovieContext = React.createContext({
    trending: "",
    netflixOriginals: "",
    topRated: "",
    actionMovies: "",
    comedyMovies: "",
    horrorMovies: "",
    romanceMovies: "",
    documentaries: "",
    imageUrl: "",
    getVideo: "",
    headers: "",
    searchUrl: "",
});

export default MovieContext;

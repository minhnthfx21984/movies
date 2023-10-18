import MovieContext from "./movie-context";

const MovieProvider = (props) => {
    const API_URL = "https://api.themoviedb.org/3/";
    const API_KEY = "90e9a640e13fa95a719e9e8c82ba5b9f";
    const ACCESS_TOKEN =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGU5YTY0MGUxM2ZhOTVhNzE5ZTllOGM4MmJhNWI5ZiIsInN1YiI6IjY0ODMxYjZlYzlkYmY5MDBlM2ZlZTZiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ZYoEOmO_O2iCnliWlz9yGMCGFfB6sQejcANZ6uf-Eg";
    const IMAGE_URL = "https://image.tmdb.org/t/p/original/";
    const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

    const getVideo = (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}/videos`;

    const headers = {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    // request
    const requests = {
        fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
        fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
        fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
        fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
        fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
        fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
        fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
        fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    };

    // API URL FOR GET DATA
    const requestApi = {
        trending: `${API_URL}${requests.fetchTrending}`,
        netflixOriginals: `${API_URL}${requests.fetchNetflixOriginals}`,
        topRated: `${API_URL}${requests.fetchTopRated}`,
        actionMovies: `${API_URL}${requests.fetchActionMovies}`,
        comedyMovies: `${API_URL}${requests.fetchComedyMovies}`,
        horrorMovies: `${API_URL}${requests.fetchHorrorMovies}`,
        romanceMovies: `${API_URL}${requests.fetchRomanceMovies}`,
        documentaries: `${API_URL}${requests.fetchDocumentaries}`,
        imageUrl: IMAGE_URL,
        searchUrl: SEARCH_URL,
        getVideo: getVideo,
        headers: headers,
    };

    return <MovieContext.Provider value={requestApi}>{props.children}</MovieContext.Provider>;
};

export default MovieProvider;

import {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap-grid.min.css";
import MovieList from "./components/MovieList.jsx";
import "./App.css"
import MovieListHeading from "./components/MovieListHeading.jsx";
import SearchBar from "./components/SearchBar.jsx";
import AddFavourite from "./components/AddFavourite.jsx";
import RemoveFavourite from "./components/RemoveFavourite.jsx";




function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMovies = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=572ad596`;
    setIsLoading(true);
    try {
      const response = await fetch(url)
      const data = await response.json();
      if (data.Search){
        setMovies(data.Search);
      }

    } catch (error) {
      console.error("Error occured while fetching movies", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies(searchValue);
  }, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  }

  useEffect(() => {
    const movieFavourites = JSON.parse(
        localStorage.getItem("react-movie-app-favourites")
    );
    setFavorites(movieFavourites);
  }, []);


  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favorites, movie];
    setFavorites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favorites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID,
    );
    setFavorites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
      <div className="container">
        <div className="searchBar">
          <MovieListHeading heading="Movie"/>
          <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>
        <div className="movie-app">
          <MovieList movies={movies}
                     favouriteComponent={AddFavourite}
                     handleFavouriteClick={addFavouriteMovie}/>
        </div>

        <div className="searchBar">
          <MovieListHeading heading="Favourites"/>
        </div>
        <div className="movie-app">
          <MovieList movies={favorites}
                     favouriteComponent={RemoveFavourite}
                     handleFavouriteClick={removeFavouriteMovie}/>
        </div>

      </div>
  )
}

export default App

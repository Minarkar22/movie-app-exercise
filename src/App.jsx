import {useEffect, useState} from 'react'
// import "bootstrap/dist/css/bootstrap-grid.min.css";
import MovieList from "./components/MovieList.jsx";
import "./App.css"
import MovieListHeading from "./components/MovieListHeading.jsx";
import SearchBar from "./components/SearchBar.jsx";




function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
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
  return (
    <div className="container">
      <div className="searchBar">
        <MovieListHeading heading="Movie"/>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="movie-app">
        <MovieList movies={movies} />
      </div>



    </div>
  )
}

export default App

import "./MovieList.css";
const MovieList = ({movies}) => {
    return (
        <>
            {movies.map((movie) => (
                <div className="movie-card">
                    <img src={movie.Poster} alt={movie.title}/>
                </div>
            ))
            }
        </>
    )
}

export default MovieList;
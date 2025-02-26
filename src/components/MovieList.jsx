import "./MovieList.css";
import React from "react";
const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.map((movie) => (
                <div className="movie-card ">
                    <img src={movie.Poster} alt={movie.title}/>
                    <div className="overlay d-flex align-items-center justify-content-center gap-5"
                            onClick={() => props.handleFavouriteClick(movie)}>
                        <FavouriteComponent/>
                    </div>

                </div>
            ))
            }
        </>
    )
}

export default MovieList;
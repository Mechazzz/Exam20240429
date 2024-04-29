import "./App.css";
import { useState } from "react";
import { searchSingleMovie } from "./lib/api";
import { searchMovieByGenre } from "./lib/api";
import Movie from "./Movie";
import SelectedByGenre from "./SelectedByGenre";
import Loading from "./Loading";
import Error from "./Error";

export type singleMovie = {
  id: string;
  name: string;
  genre: string;
  description: string;
};

export type moviesByGenre = {
  id: string;
  name: string;
}[];

const MovieDefault = {
  id: "",
  name: "",
  genre: "",
  description: "",
};

function App() {
  const [movieID, setMovieID] = useState<string>("");
  const [movie, setMovie] = useState<singleMovie>(MovieDefault);
  const [moviesByGenre, setMoviesByGenre] = useState<moviesByGenre>([]);
  const [genre, setGenre] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedMovie, setSearchedMovie] = useState(false);
  const [isTypingID, setIsTypingID] = useState(false);
  const [isTypingGenre, setIsTypingGenre] = useState(false);

  const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTypingGenre(true);
    setMovieID(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTypingID(true);
    setGenre(e.target.value);
  };

  const handleSearchByID = async () => {
    setIsLoading(true);
    setError(false);
    if (!movieID) {
      setErrorMessage("Please enter valid movie ID");
      setIsLoading(false);
      setError(true);
      return;
    }

    const response = await searchSingleMovie(movieID);
    if (response.status === 404) {
      setErrorMessage("Movie was not found. Please enter valid movie ID");
      setIsLoading(false);
      setError(true);
      return;
    }
    if (response.status === 500) {
      setErrorMessage("Server error. Please try again later");
      setIsLoading(false);
      setError(true);
      return;
    }

    if (!response.success) {
      setErrorMessage("No response from Server. Please try again later");
      setIsLoading(false);
      setError(true);
      return;
    }

    setMovie(response.data);
    setIsLoading(false);
    setSearchedMovie(true);
  };

  const handleSearchByGenre = async () => {
    setIsLoading(true);
    setError(false);
    if (!genre) {
      setErrorMessage("Movie was not found. Please enter valid movie genre");
      setIsLoading(false);
      setError(true);
      return;
    }

    const response = await searchMovieByGenre(genre);
    if (response.status === 400) {
      setErrorMessage("Bad request. Please enter valid movie genre");
      setIsLoading(false);
      setError(true);
      return;
    }
    if (response.status === 500) {
      setErrorMessage("Server error. Please try again later");
      setIsLoading(false);
      setError(true);
      return;
    }
    if (!response.success) {
      setErrorMessage("No response from Server. Please try again later");
      setIsLoading(false);
      setError(true);
      return;
    }

    if (response.data.length === 0) {
      setErrorMessage("Movie was not found");
      setIsLoading(false);
      setError(true);
      return;
    }

    setMoviesByGenre(response.data);
    setIsLoading(false);
    setSearchedMovie(true);
  };

  const back = () => {
    setSearchedMovie(false);
    setIsTypingGenre(false);
    setIsTypingID(false);
    setGenre("");
    setMovieID("");
    setMovie({} as singleMovie);
    setMoviesByGenre([]);
  };

  return (
    <>
      <div>
        {!searchedMovie && (
          <main className="flex flex-col items-center py-16 space-y-8 ">
            <h1 className="text-3xl font-bold text-center my-8">
              Movie Finder
            </h1>
            {isLoading && <Loading />}
            <section className="w-80 mx-auto bg-gray-200 p-6 rounded-md shadow-md text-gray-800 ml-20">
              <h2 className="text-xl font-semibold mb-4">
                Please enter the ID of the movie
              </h2>
              <div className="mb-4">
                <label className="block mb-1">ID: </label>
                <input
                  value={movieID}
                  onChange={handleIDChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
                  type="text"
                  placeholder="ID"
                  disabled={isTypingID}
                />
              </div>
              <button
                onClick={handleSearchByID}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
                disabled={isTypingID}
              >
                SEARCH
              </button>
            </section>
            <section className="w-80 mx-auto bg-gray-200 p-6 rounded-md shadow-md text-gray-800 ml-20">
              <h2 className="text-xl font-semibold mb-4">
                Please enter the name of the genre
              </h2>
              <div className="mb-4">
                <label className="block mb-1">Name of the genre</label>
                <input
                  value={genre}
                  onChange={handleGenreChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800 bg-white"
                  type="text"
                  placeholder="Genre name"
                  disabled={isTypingGenre}
                />
              </div>
              <button
                onClick={handleSearchByGenre}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                disabled={isTypingGenre}
              >
                SEARCH
              </button>
            </section>
            {error && (
              <Error
                errorMessage={errorMessage}
                error={error}
                setError={setError}
              />
            )}
          </main>
        )}
        {searchedMovie && movie.id && <Movie movie={movie} back={back} />}
        {searchedMovie && moviesByGenre.length > 0 && (
          <SelectedByGenre
            moviesByGenre={moviesByGenre}
            back={back}
            genre={genre}
          />
        )}
      </div>
    </>
  );
}

export default App;

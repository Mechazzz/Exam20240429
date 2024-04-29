import {} from "./App";
import { singleMovie } from "./App";

interface Props {
  movie: singleMovie;
  back: () => void;
}

const Movie = ({ movie, back }: Props) => {
  return (
    <>
      <div className="w-80 mx-auto bg-gray-200 p-6 rounded-md shadow-md text-gray-800 ml-20">
        <h1 className="text-3xl font-bold text-center my-8">Found Movie</h1>
        <h2 className="text-lg font-semibold mt-4 mb-4">Movie Details:</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="mb-2">Movie id: {movie.id}</p>
            <p className="mb-2">Movie name: {movie.name}</p>
            <p className="mb-2">Movie name: {movie.genre}</p>
            <p className="mb-2">Movie description: {movie.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              More Details
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={back}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Movie;

import { moviesByGenre } from "./App";

interface Props {
  moviesByGenre: moviesByGenre;
  back: () => void;
  genre: string;
}

const SelectedByGenre = ({ moviesByGenre, back, genre }: Props) => {
  return (
    <>
      <div className="w-80 mx-auto bg-gray-200 p-6 rounded-md shadow-md text-gray-800 ml-20">
        <h1 className="text-3xl font-bold text-center my-8">Found Movies</h1>
        <h2 className="text-lg font-semibold mb-4">Movies by genre: {genre}</h2>
        <div className="space-y-6">
          {moviesByGenre.map((movieByGenre) => (
            <div
              key={movieByGenre.id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <p className="mb-4">Movie ID : {movieByGenre.id}</p>
              <p className="mb-4">Movie name : {movieByGenre.name}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                More Details
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8">
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

export default SelectedByGenre;

interface Props {
  errorMessage: string;
  error: boolean;
  setError: (error: boolean) => void;
}
const Error = ({ errorMessage, setError }: Props) => {
  const close = () => {
    setError(false);
  };

  return (
    <div className="bg-red-500 border border-red-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center">
      <span>{errorMessage}</span>
      <button
        className="ml-4 text-white bg-red-700 rounded px-3 py-1 hover:bg-red-600"
        onClick={close}
      >
        X
      </button>
    </div>
  );
};

export default Error;

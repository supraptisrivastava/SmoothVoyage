const ErrorMessage = ({ error }) => (
  error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null
);

export default ErrorMessage;

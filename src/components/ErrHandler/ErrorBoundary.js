import { useState ,useLayoutEffect} from "react";
import { useNavigate } from "react-router-dom";

function ErrorBoundary(props) {
  console.log("props",props)
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const handleCatch = (error, errorInfo) => {
    // You can also log the error to an error reporting service like AppSignal
    // logErrorToMyService(error, errorInfo);
    setError(error);
    setHasError(true);
  };

  useLayoutEffect(() => {
    handleCatch()
  }, [])

  if (hasError) {
    // You can render any custom fallback UI
    return (
      <div>
        <p>Something went wrong 😭</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>

        {error && error.message && (
          <span>Here's the error: {error.message}</span>
        )}
      </div>
    );
  }

  return props.children;
}

export default ErrorBoundary;

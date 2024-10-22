import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full flex items-center justify-center bg-gray-100 ">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">{`404`}</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-6">
          {`Page Not Found`}
        </p>
        <p className="text-lg text-gray-500 mb-5">
          {`Oops! The page you're looking for doesn't exist.`}
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {`Go Home`}
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

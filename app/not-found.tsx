import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-gray-600 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-500 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-boxdark-2 rounded-md text-lg shadow-md hover:bg-primary/75 transition duration-300 ease-in-out"
      >
        Go Back Home
      </Link>
    </div>
  );
}

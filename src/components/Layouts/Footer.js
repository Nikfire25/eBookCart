import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl p-6 flex items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
          © 2026{" "}
          <Link to="/" className="hover:underline">
            eBookCart
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};


import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f2c] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
     
        <Link to="/" className="text-xl font-bold text-white">
          ✈️ SmoothVoyage
        </Link>

      
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-white hover:text-blue-400 transition"
            >
              Dashboard
            </Link>
          )}

          <ThemeToggle />

          {isAuthenticated ? (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

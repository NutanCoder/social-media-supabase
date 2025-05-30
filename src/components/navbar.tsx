import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInWithGitHub, signOut, user } = useAuth();

  const displayName = user?.user_metadata.user_name || user?.email;

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="font-mono text-xl font-bold text-white">
            forum<span className="text-purple-500">.app</span>
          </Link>

          {/*Desktop Links*/}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to={"/create"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Create Post
            </Link>
            <Link
              to={"/communities"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Communities
            </Link>
            <Link
              to={"/community/create"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Create Community{" "}
            </Link>
          </div>

          {/*Desktop Auth*/}

          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-300">{displayName}</span>
                <button
                  onClick={signOut}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="bg-blue-500 px-3 py-1 rounded"
              >
                Sign In With Github
              </button>
            )}
          </div>

          {/*Mobile Menu Button*/}

          <div className="md:hidden">
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentcolor"
                viewBox="0 0 24 24"
                xmlns="https://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/*Mobile Menu*/}

      {menuOpen && (
        <div>
          <div>
            <Link to={"/"}>Home</Link>
            <Link to={"/create"}>Create Post</Link>
            <Link to={"/communities"}>Communities</Link>
            <Link to={"/community/create"}>Create Community </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

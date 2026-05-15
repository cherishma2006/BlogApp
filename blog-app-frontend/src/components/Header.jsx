import { NavLink } from "react-router";
import { useAuth } from "../stores/authStore";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "AUTHOR":
        return "/author-profile";
      case "ADMIN":
        return "/admin-profile";
      default:
        return "/user-profile";
    }
  };

  return (
  <nav className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50 shadow-sm">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <NavLink
        to="/"
        className="text-2xl font-bold tracking-wide bg-gradient-to-r from-pink-400 via-orange-400 to-sky-400 bg-clip-text text-transparent"
      >
        MyBlog
      </NavLink>

      {/* NAV LINKS */}
      <ul className="flex items-center gap-6 text-sm font-medium">

        {/* HOME */}
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-pink-500 border-b-2 border-pink-400 pb-1"
                : "text-gray-600 hover:text-pink-500 transition"
            }
          >
            Home
          </NavLink>
        </li>

        {/* NOT LOGGED IN */}
        {!isAuthenticated && (
          <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 border-b-2 border-orange-300 pb-1"
                    : "text-gray-600 hover:text-orange-400 transition"
                }
              >
                Register
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                className="bg-gradient-to-r from-pink-300 via-orange-200 to-sky-200 text-gray-700 px-4 py-1.5 rounded-full hover:scale-105 transition duration-300 shadow-md"
              >
                Login
              </NavLink>
            </li>
          </>
        )}

        {/* LOGGED IN */}
        {isAuthenticated && (
          <li className="flex items-center gap-3">

            {/* Profile Image */}
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-pink-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-200 to-orange-200 text-pink-600 flex items-center justify-center text-sm font-semibold">
                {user?.firstName?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <NavLink
              to={getProfilePath()}
              className="text-gray-700 hover:text-pink-500 transition"
            >
              {user?.firstName || "Profile"}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  </nav>
  );
}

export default Header;
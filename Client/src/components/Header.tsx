import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/authSlice";

const Header = () => {
  const userData = useSelector((state: any) => state.auth.userData);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const [navLinks, setNavLinks] = useState([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const updatedLinks = [
      ...navLinks.filter((link) => link.name !== "Dashboard"),
    ];

    if (isAuthenticated) {
      updatedLinks.splice(1, 0, { name: "Dashboard", path: "/dashboard" });
    }

    setNavLinks(updatedLinks);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser())
    navigate("/auth/login");
  };

  return (
    <header className="flex justify-between items-center px-10 py-4 bg-gray-300 shadow-md">
      <div className="">LOGO</div>
      <nav>
        <ul>
          {navLinks.map((nav) => (
            <li key={nav.name} className="inline-block mx-2">
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-700 hover:bg-gray-300"
                  }`
                }
              >
                {nav.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Avatar>
              <AvatarImage src={userData?.avatar || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              onClick={handleLogout}
              className="cursor-pointer"
            >
              logout
            </Button>
          </>
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

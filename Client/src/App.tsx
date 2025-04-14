import { Outlet } from "react-router-dom";
import {Header} from "./components";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/authSlice";

const App = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // Check if token is expired
  const isTokenExpired = () => {
    if (!token) return true;

    const payloadPart = token.split(".")[1];
    if (!payloadPart) return true;

    const decodedPayload = atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(decodedPayload);

    const expirationTime = payload.exp * 1000;
    return Date.now() > expirationTime;
  };
  // If token is expired, remove it from localStorage
  if (isTokenExpired()) {
    localStorage.removeItem("token");
  }
  // Fetch user data if token is present
  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user`,
        {
          withCredentials: true, // Important to send cookies!
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      dispatch(loginUser(data.user));
      // console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // Fetch user data on component mount
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token,]);


  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header/>
      <Outlet />
    </div>
  );
};

export default App;

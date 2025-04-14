import { loginUser } from "@/store/authSlice";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login data:", data);
    // Perform login logic here

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data, {
        withCredentials: true,
      });
      console.log("Login response:", response.data);
      if (response.data.success) {
        dispatch(loginUser(response.data.user));
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        navigate("/"); // Redirect to home page after successful login
      } else {
        // Handle login failure (e.g., show an error message)
        console.error("Login failed:", response.data.message);
      }

      
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show a notification)
      
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login clicked");
    window.open('http://localhost:5000/auth/google', '_self');

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>

          <div className="flex w-full justify-center">
            OR
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Not registered?{" "}
          <button
            onClick={() => navigate("/auth/register")}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

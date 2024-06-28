import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.data);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-fit mx-auto">
      <h1 className="mb-2 text-5xl">{isLoading ? "Processing" : "Login"}</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-left w-full">
            email
          </label>
          <input
            className={`p-2 border-2 rounded-lg mb-2 outline-none focus:border-gray-600 bg-transparent ${
              errors.email && "focus:border-red-500 border-red-500"
            }`}
            id="email"
            type="email"
            value={formData.email}
            placeholder="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors || errorMessage) {
                setError("");
                errors.email = "";
              }
            }}
          />
          {errors.email && (
            <p className="text-red-500 text-left">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-left w-full">
            password
          </label>
          <input
            className={`p-2 border-2 rounded-lg mb-2 outline-none focus:border-gray-600 bg-transparent  ${
              errors.password && "focus:border-red-500 border-red-500"
            }`}
            id="password"
            type="password"
            value={formData.password}
            placeholder="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "password at least 6 char long ",
              },
            })}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errorMessage || errors) {
                setError("");
                errors.password = "";
              }
            }}
          />
          {errors.password && (
            <p className="text-red-500  text-left">{errors.password.message}</p>
          )}
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <button
          className=" w-full h-14 rounded-xl border hover:bg-gray-700"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? (
            "Login"
          ) : (
            <>
              <svg
                className="animate-spin h-6 w-6 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-55"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>{" "}
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

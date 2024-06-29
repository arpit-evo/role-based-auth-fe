import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        "/api/auth/register",
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRegistered(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 min-w-full mx-auto">
      <h1 className="mb-4 text-5xl font-bold">
        {loading ? "Loading" : "Register"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col min-w-96"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-left w-full mb-1">
            Name
          </label>
          <input
            className={`w-full p-2 px-4 border-2 rounded-lg mb-4 outline-none border-gray-600 focus:border-white bg-transparent ${
              errors.name && "focus:border-red-500 border-red-500"
            }`}
            id="name"
            type="name"
            value={formData.name}
            placeholder="Name"
            {...register("name", {
              required: "name is required",
            })}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors || errorMessage) {
                setError("");
                errors.name = "";
              }
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-left">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-left w-full mb-1">
            Email
          </label>
          <input
            className={`w-full p-2 px-4 border-2 rounded-lg mb-4 outline-none border-gray-600 focus:border-white bg-transparent ${
              errors.email && "focus:border-red-500 border-red-500"
            }`}
            id="email"
            type="email"
            value={formData.email}
            placeholder="Email"
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
          <label htmlFor="password" className="text-left w-full mb-1">
            Password
          </label>
          <input
            className={`p-2 px-4 border-2 rounded-lg mb-4  border-gray-600 focus:border-white bg-transparent  ${
              errors.password && "focus:border-red-500 border-red-500"
            }`}
            id="password"
            type="password"
            value={formData.password}
            placeholder="Password"
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
          className="w-full p-2 rounded-xl border hover:bg-gray-700 mt-2 font-semibold"
          type="submit"
          disabled={loading}
        >
          {loading ? (
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
              Register
            </>
          ) : registered ? (
            <span className="text-green-500 font-semibold">
              Registration Successful
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;

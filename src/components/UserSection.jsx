import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../apis/axiosInstance";

const UserSection = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: user.email,
    },
  });

  useEffect(() => {
    setValue("email", user.email);
  }, [user]);

  const onUpdate = async (data) => {
    try {
      const response = await axiosInstance.patch("/api/user/update", data);
      setValue("email", response.data.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-left w-full">
          Email
        </label>
        <input
          className={`p-2 border-2 rounded-lg mb-2 outline-none focus:border-gray-600 bg-transparent ${
            errors.email && "focus:border-red-500 border-red-500"
          }`}
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-left">{errors.email.message}</p>
        )}
      </div>
      <div>Role: {user.role}</div>
      <div className="text-right">
        <button className="px-2 py-2 bg-blue-600 rounded-lg" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

export default UserSection;

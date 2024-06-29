import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../apis/axiosInstance";
import { REVERSE_ROLES } from "../utils/enums";

const EditName = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: user.name,
    },
  });

  useEffect(() => {
    setValue("name", user.name);
  }, [user]);

  const onUpdate = async (data) => {
    try {
      const response = await axiosInstance.put("/api/users/profile", data);
      setValue("name", response.data.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-left w-full">
          Name
        </label>
        <input
          className={`p-2 border-2 rounded-lg mb-2 outline-none focus:border-white border-gray-600 bg-transparent ${
            errors.name && "focus:border-red-500 border-red-500"
          }`}
          id="name"
          type="name"
          placeholder="Name"
          {...register("name", {
            required: "name is required",
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-left">{errors.name.message}</p>
        )}
      </div>
      <p>Role: {REVERSE_ROLES[user.role].toLowerCase()}</p>
      <div className="text-right">
        <button className="px-6 py-2 bg-blue-600 rounded-lg" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditName;

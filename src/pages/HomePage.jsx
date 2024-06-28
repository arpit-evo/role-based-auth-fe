import { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserSection from "../components/UserSection";

const HomePage = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchMe = async () => {
      const response = await axiosInstance.get("/api/user/me");
      setRole(response.data.data.role);
      setUser(response.data.data);

      setValue("email", response.data.data.email);
    };
    fetchMe();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser({});
    setRole("");
    navigate("/login");
  };

  return (
    <div className="p-20 ">
      <div className="max-w-7xl flex justify-between mx-auto mb-8">
        <div className="text-2xl">
          {role === "user" && "Home Page"}
          {role === "admin" && "Admin Page"}
          {role === "moderator" && "Moderator Page"}
        </div>
        <div
          className="flex gap-2 items-center text-center z-10 cursor-pointer"
          onClick={handleLogout}
        >
          <p className="text-2xl">Logout</p>
          <MdLogout className="text-[32px] cursor-pointer" />
        </div>
      </div>
      <div className="w-[40rem] mx-auto ">
        <UserSection user={user} />
      </div>
    </div>
  );
};

export default HomePage;

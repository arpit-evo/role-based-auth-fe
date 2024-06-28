import { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserSection from "../components/UserSection";
import ModeratorSection from "../components/ModeratorSection";

const HomePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      const response = await axiosInstance.get("/api/user/me");
      setUser(response.data.data);
    };
    fetchMe();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser({});
    navigate("/login");
  };

  return (
    <div className="p-20 ">
      <div className="max-w-7xl flex justify-between mx-auto mb-8">
        <div className="text-2xl">
          {user.role === "user" && "Home Page"}
          {user.role === "admin" && "Admin Page"}
          {user.role === "moderator" && "Moderator Page"}
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
        {user.role === "user" && <UserSection user={user} />}
        {user.role === "moderator" && <ModeratorSection user={user} />}
      </div>
    </div>
  );
};

export default HomePage;

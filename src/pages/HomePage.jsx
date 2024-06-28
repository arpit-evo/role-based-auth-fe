import { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMe = async () => {
      const response = await axiosInstance.get("/api/user/me");
      setRole(response.data.data.role);
      setUser(response.data.data);
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
    <div className="p-20">
      <div className="max-w-7xl flex justify-between mx-auto">
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
    </div>
  );
};

export default HomePage;

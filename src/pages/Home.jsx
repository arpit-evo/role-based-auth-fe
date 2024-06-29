import { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import EditName from "../components/EditName";
import UserList from "../components/UserList";
import WelcomeCard from "../components/WelcomeCard";
import { ROLES } from "../utils/enums";
import HomeHeader from "../components/HomeHeader";
import Loader from "../components/Loader";

const Home = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const response = await axiosInstance.get("/api/users/profile");
      setUser(response.data.data);
      setLoading(false);
      localStorage.setItem("userDetails", JSON.stringify(response.data.data));
    };
    fetchMe();
  }, []);

  return (
    <div className="p-20">
      {loading && <Loader />}
      {!loading && user && (
        <>
          <HomeHeader user={user} />
          <WelcomeCard user={user} />
          <div className="w-[40rem] mx-auto">
            {user.role == ROLES.USER && <EditName user={user} />}
            {(user.role == ROLES.MODERATOR || user.role == ROLES.ADMIN) && (
              <UserList user={user} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

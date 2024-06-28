import React, { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosInstance";

const ModeratorSection = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchMe = async () => {
      const response = await axiosInstance.get("/api/user/all-users");
      setUsers(response.data.data);
    };
    fetchMe();
  }, []);

  const onUpdate = async (data) => {
    try {
      for (const user of users) {
        const response = await axiosInstance.patch(
          `/api/user/update/${user._id}`,
          data
        );
        setUsers([...users, response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="border rounded-xl p-2">
        {users.map((user) => (
          <div className="flex justify-between mb-3 last:mb-0 border-b-2 last:border-b-0 p-2">
            <div>{user.email}</div>
            <div>reported: {user.reported ? "true" : "false"}</div>
            <button className="px-2 py-1 bg-blue-600 rounded-lg" type="submit">
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeratorSection;

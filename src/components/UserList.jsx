import React, { useEffect, useState } from "react";
import axiosInstance from "../apis/axiosInstance";
import { REVERSE_ROLES, ROLES } from "../utils/enums";
import { MdDelete } from "react-icons/md";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const fetchMe = async () => {
    const response = await axiosInstance.get("/api/users");
    setUsers(response.data.data);
  };
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    fetchMe();
    setCurrentUser(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  const deleteUser = async (user) => {
    try {
      await axiosInstance.delete(`/api/users/${user._id}`);
      fetchMe();
    } catch (error) {
      console.log(error);
    }
  };
  const changeUserRole = async (e, user) => {
    try {
      await axiosInstance.put(`/api/users/${user._id}`, {
        role: parseInt(e.target.value),
      });
      fetchMe();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="border rounded-xl px-2">
        {users.map((user, index) => (
          <>
            {!index && (
              <div
                className={`flex last:mb-0 border-b-2 last:border-none p-2 font-semibold text-lg`}
                key={index}
              >
                <p className="cursor-default flex-1">Email</p>
                {currentUser.role == ROLES.MODERATOR && (
                  <p className="first-letter:capitalize cursor-default">Role</p>
                )}
                {currentUser.role == ROLES.ADMIN && !user.isDeleted && (
                  <div className="flex justify-end items-center space-x-2">
                    Actions
                  </div>
                )}
              </div>
            )}
            <div
              className={`flex justify-between last:mb-0 border-b-2 last:border-none p-2 ${
                user.isDeleted && "text-red-500"
              }`}
              key={user._id}
            >
              <p className="cursor-default">{user.email}</p>
              {currentUser.role == ROLES.MODERATOR && (
                <p className="first-letter:capitalize font-semibold cursor-default">
                  {REVERSE_ROLES[user.role].toLowerCase()}
                </p>
              )}
              {currentUser.role == ROLES.ADMIN && !user.isDeleted && (
                <div className="flex justify-end items-center space-x-2">
                  <select
                    onChange={(e) => changeUserRole(e, user)}
                    defaultValue={user.role}
                    className="text-black rounded-lg px-2 py-1"
                  >
                    <option value={ROLES.ADMIN}>Admin</option>
                    <option value={ROLES.MODERATOR}>Moderator</option>
                    <option value={ROLES.USER}>User</option>
                  </select>
                  <p className="flex justify-center items-center">
                    <MdDelete
                      className="text-xl fill-red-500 cursor-pointer"
                      onClick={() => deleteUser(user)}
                    />
                  </p>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
      <p className="mt-2 text-slate-300">
        <span className="font-semibold">Note: </span>Users in{" "}
        <span className="text-red-500">red</span> are deleted.
      </p>
    </>
  );
};

export default UserList;

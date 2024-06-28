import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-900 min-h-screen  text-white overflow-hidden">
      <main className="w-full max-w-screen-2xl flex flex-col flex-grow 2xl:mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

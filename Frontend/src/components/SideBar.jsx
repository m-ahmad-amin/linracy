import logo from "../assets/logo.png";
import { House, Search, UserPenIcon, Settings, CircleSlash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar({page, showModal, setShowModal, setPage}) {

  const handleSearchClick = async () => {
    setShowModal(true);
    setPage("search")
  }

    const navigate = useNavigate();
  return (
    <>
      <div className="p-5 fixed top-0 left-0 h-full w-1/6 flex flex-col justify-start bg-white shadow-md">
        <div className="pb-5 pl-2 flex items-center">
          <img src={logo} alt="Linracy" className="w-[50%]" />
        </div>

        <div className="pt-5">
          <div onClick={() => {
            navigate("/")
          }} className={`${page === "home" && "shadow-lg"} p-2 flex gap-2 ${page === "home" ? "font-bold" : "font-semibold"} transition-all hover:bg-gray-200 rounded hover:cursor-pointer`}>
            <House className="font-bold"/>
            <h1>Home</h1>
          </div>
        </div>

        <div className="pt-3">
          <div onClick={handleSearchClick} className={`${page === "search" && "shadow-lg"} p-2 flex gap-2 ${page === "search" ? "font-bold" : "font-semibold"} transition-all hover:bg-gray-200 rounded hover:cursor-pointer`}>
            <Search />
            <h1>Search</h1>
          </div>
        </div>

        <div className="pt-3">
          <div onClick={() => {
            navigate("/profile")
          }} className={`${page === "profile" && "shadow-lg"} p-2 flex gap-2 ${page === "profile" ? "font-bold" : "font-semibold"} transition-all hover:bg-gray-200 rounded hover:cursor-pointer`}>
            <CircleSlash />
            <h1>Profile</h1>
          </div>
        </div>

        <div className="pt-3">
          <div className={`${page === "settings" && "shadow-lg"} p-2 flex gap-2 ${page === "settings" ? "font-bold" : "font-semibold"} transition-all hover:bg-gray-200 rounded hover:cursor-pointer`}>
            <Settings />
            <h1>Settings</h1>
          </div>
        </div>
      </div>
    </>
  );
}

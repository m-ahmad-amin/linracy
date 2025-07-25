import { useState } from "react";
import SideBar from "../components/SideBar";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useAuthStore();
  const [fullName, setFullName] = useState(authUser.fullName);
  const [userName, setUserName] = useState(authUser.userName);
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const handleLogOutClick = () => {
    setShowLogOutModal(true);
  };

  const handleLogOutSureClick = async() => {
    try {
                const res = await axiosInstance.post("/auth/logout");

                toast.success("Log out success")
                checkAuth();
                navigate("/login");
            } catch (error) {
                if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        } else {
        toast.error("Something went wrong");
        }
            }
  }

  return (
    <>
      {showLogOutModal && (
        <div className="flex justify-center fixed items-center w-full inset-0 z-50 bg-black/50">
          <div className="bg-white w-[90%] md:w-[30%] h-[16%] md:h-[16%] rounded-lg p-4 flex flex-col gap-4">
            <h1 className="font-semibold text-lg">Are you sure you want to log out?</h1>
            <div className="flex justify-end gap-2">
              <button onClick={() => {
                setShowLogOutModal(false);
              }} className="w-20 h-10 bg-[#979591] text-white rounded hover:bg-[#504f4d] p-2">
                <h1 className="font-bold text-md">Cancel</h1>
              </button>
              <button onClick={handleLogOutSureClick} className="w-30 h-10 bg-[#e84326] text-white rounded hover:bg-[#823528] flex p-2 gap-2">
                <h1 className="font-bold text-md">Log Out</h1>
                <LogOut />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center h-dvh">
        <div className="h-full w-[20%] hidden md:block">
          <SideBar page={"settings"} />
        </div>

        <div className="p-2 w-full flex flex-col gap-4 items-center">
          <h1 className="font-bold text-lg text-center">
            Edit Profile and Settings
          </h1>

          {/* Profile Picture Section */}
          <div className="flex justify-between border-2 rounded-md w-[90%] md:w-[50%] p-4">
            <div className="flex flex-col gap-4 items-start">
              <h1 className="font-bold text-md">Change profile picture</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => {}}
                  className="w-20 h-8 bg-[#979591] text-white rounded hover:bg-[#504f4d]"
                >
                  Update
                </button>
                <button
                  onClick={() => {}}
                  className="w-20 h-full bg-[#979591] text-white rounded hover:bg-[#504f4d]"
                >
                  Delete
                </button>
              </div>
            </div>
            <img
              src={authUser.profilePic}
              className="rounded-full
                            h-20
                            w-20"
            ></img>
          </div>

          {/* Username Section */}
          <div className="flex justify-between border-2 rounded-md w-[90%] md:w-[50%] p-4">
            <div className="flex justify-between w-[100%] gap-2">
              <h1 className="font-bold text-md w-28">Username:</h1>
              <input
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
                placeholder="Username"
                className="text-right w-full focus:outline-none"
              ></input>
            </div>
          </div>

          {/* Full name Section */}
          <div className="flex justify-between border-2 rounded-md w-[90%] md:w-[50%] p-4">
            <div className="flex justify-between w-[100%] gap-2">
              <h1 className="font-bold text-md w-28">Full Name:</h1>
              <input
                type="text"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                value={fullName}
                placeholder="Full name"
                className="text-right w-full focus:outline-none"
              ></input>
            </div>
          </div>

          <div className="flex justify-end w-[90%] md:w-[50%] gap-2">
            <button onClick={navigate(-1)} className="p-1 w-20 h-full bg-[#979591] text-white rounded hover:bg-[#504f4d]">
              Cancel
            </button>
            <button className="w-20 h-full bg-[#d0cec9] text-white rounded hover:bg-[#d0cec9] hover:cursor-default">
              Update
            </button>
          </div>

          <div>
            <button onClick={handleLogOutClick} className="flex gap-2 p-2">
              <h1 className="font-bold text-md">Log Out</h1>
              <LogOut />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

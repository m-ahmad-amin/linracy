import { Settings, Plus, LogOut, ArrowLeft } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";
import { usePostStore } from "../store/usePostStore";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

export default function HeaderProfile({ userName, profilePicture, userData }) {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useAuthStore();
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const handleLogOutClick = () => {
    setShowLogOutModal(true);
  };

  const handleLogOutSureClick = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      toast.success("Log out success");
      checkAuth();
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const fileInputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [uploadedURL, setUploadedURL] = useState("");

  const { postCreated, setPostCreated, isPosting, setIsPosting } =
    usePostStore();

  const handleNewClick = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedURLObject = await res.json();

    setUploadedURL(uploadedURLObject.url);

    setShowModal(true);
  };

  const handleUpload = async () => {
    setIsPosting(true);
    try {
      await axiosInstance.post(`/profile/${userName}/new`, {
        userName: userName,
        uploadedURL: uploadedURL,
        caption: caption,
        profilePicture: profilePicture,
      });

      toast.success("Post created successfully");
      setPostCreated(true);
      setIsPosting(false);
      setCaption("");
      setShowModal(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
    {showLogOutModal && (
        <div className="flex justify-center fixed items-center w-full inset-0 z-50 bg-black/50">
          <div className="bg-white w-[90%] lg:w-[30%] h-36 sm:h-32 rounded-lg p-4 flex flex-col gap-4">
            <h1 className="font-semibold text-lg">
              Are you sure you want to log out?
            </h1>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowLogOutModal(false);
                }}
                className="w-20 h-10 bg-[#979591] text-white rounded hover:bg-[#504f4d] p-2"
              >
                <h1 className="font-bold text-md">Cancel</h1>
              </button>
              <button
                onClick={handleLogOutSureClick}
                className="w-30 h-10 bg-[#e84326] text-white rounded hover:bg-[#823528] flex p-2 gap-2"
              >
                <h1 className="font-bold text-md">Log Out</h1>
                <LogOut />
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white pl-4 pr-4 pb-4 pt-2 rounded-lg w-[90%] max-w-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Post</h2>
            <img
            src={uploadedURL}
            className="h-full w-full object-cover rounded-lg border"></img>
            <h2 className="text-lg font-bold mb-2 mt-2">Enter Caption</h2>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border rounded-md p-2 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#e63946]"
              rows={3}
              placeholder="Write a caption..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setUploadedURL("");
                  setCaption("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-[#e63946] text-white rounded hover:bg-[#a22a34]"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between p-3 md:hidden">
        <div className="flex gap-2 items-center">
        <ArrowLeft className="hover:border hover:rounded-full hover:cursor-pointer hover:bg-[#c9c4b9]" onClick={() => {
          navigate(-1);
        }} />
        <h1 className="font-bold text-lg">@{userName}</h1>
        </div>
        <LogOut onClick={handleLogOutClick} />
      </div>

      <div className="flex justify-center pl-5 pr-5 pb-5 md:pt-5">
        <img
          src={authUser.userName === userName ? authUser.profilePic : profilePicture}
          alt="profile pic"
          className="object-cover rounded-full w-20 h-20 md:w-36 md:h-36"
        ></img>

        <div className="flex flex-col pl-8 md:text-lg md:pt-3">
          <div>
            <h1 className="font-semibold">{userData.fullName}</h1>
          </div>
          <div className="flex justify-start gap-3">
            <div>
              <div>
                <h1 className="font-semibold">{userData.posts}</h1>
              </div>
              <div>
                <h1>posts</h1>
              </div>
            </div>
            <div>
              <div>
                <h1 className="font-semibold">{userData.follower}</h1>
              </div>
              <div>
                <h1>followers</h1>
              </div>
            </div>
            <div>
              <div>
                <h1 className="font-semibold">{userData.following}</h1>
              </div>
              <div>
                <h1>following</h1>
              </div>
            </div>
          </div>
        </div>

      </div>

      {authUser.userName === userName && (
      <div className="flex w-full justify-center text-md h-8 md:h-16">
        <div className="flex w-[80%] mt-1 justify-center gap-2 md:w-[30%]">
          <div className="flex items-center gap-2 w-[50%]">
            <label
              htmlFor="file-upload"
              className="w-full h-full flex items-center justify-center gap-2 cursor-pointer bg-[#979591] text-white px-3 rounded hover:bg-[#504f4d]"
            >
              <Plus className="h-4 md:h-6" />
              <h1 className="text-sm md:text-base">New</h1>
            </label>
            <input
              onChange={handleNewClick}
              id="file-upload"
              type="file"
              className="hidden"
              ref={fileInputRef}
            />
          </div>

          <button onClick={() => {
            navigate("/settings")
          }} className="w-[50%] h-full bg-[#979591] text-white rounded hover:bg-[#504f4d]">
            Edit Profile
          </button>
        </div>
      </div>
      )}

      <hr className="mt-4"></hr>
    </>
  );
}

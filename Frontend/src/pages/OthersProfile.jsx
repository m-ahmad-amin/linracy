import HeaderProfile from "../components/HeaderProfile.jsx";
import MainProfile from "../components/MainProfile.jsx";
import { axiosInstance } from "../lib/axios.js";
import { usePostStore } from "../store/usePostStore.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

export default function OthersProfile() {


  const location = useLocation();

  const { userName, profilePicture } = location.state;

  const { postCreated, setPostCreated, isPosting } = usePostStore();

  const [allPosts, setAllPosts] = useState([]);

  const [userData, setUserData] = useState({
    fullName: "",
    posts: 0,
    follower: 0,
    following: 0,
  });

  const getProfile = async () => {
    const res = await axiosInstance.post(`/profile/${userName}`);
    // console.log(res.data);
    setUserData({
      fullName: res.data.fullName,
      posts: res.data.posts,
      follower: res.data.follower,
      following: res.data.following,
    });
  };

  useEffect(() => {
    getProfile();
  }, [postCreated]);

  if (isPosting) {
      return (
      <div className="h-dvh flex justify-center items-center">
        <Loader className="size-10 animate-spin" />
        </div>)
    }

  return (
    <>
      <HeaderProfile userName={userName} userData={userData} />
      <MainProfile userName={userName} profilePicture={profilePicture} allPosts={allPosts} setAllPosts={setAllPosts} />
    </>
  );
}

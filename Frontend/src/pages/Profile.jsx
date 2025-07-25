import HeaderProfile from "../components/HeaderProfile";
import MainProfile from "../components/MainProfile";
import { axiosInstance } from "../lib/axios.js";
import { usePostStore } from "../store/usePostStore";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import SideBar from "../components/SideBar.jsx";
import FooterProfile from "../components/FooterProfile.jsx";

export default function Profile() {
  const { postCreated, setPostCreated, isPosting } = usePostStore();

  const [allPosts, setAllPosts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "",
    profilePic: "",
    posts: 0,
    follower: 0,
    following: 0,
  });

  const { authUser } = useAuthStore();

  const getProfile = async () => {
    const res = await axiosInstance.post(`/profile/${authUser.userName}`);
    // console.log(res.data);
    setUserData({
      fullName: res.data.fullName,
      profilePic: res.data.profilePic,
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
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center h-dvh md:justify-between">
        <div className="h-full w-[20%] hidden md:block">
          <SideBar page={"profile"}/>
        </div>

        <div className="md:w-full">
          <HeaderProfile userName={authUser.userName} userData={userData} />
          <MainProfile
            userName={authUser.userName}
            profilePicture={authUser.profilePicture}
            allPosts={allPosts}
            setAllPosts={setAllPosts}
          />
          <FooterProfile />
        </div>
      </div>
    </>
  );
}

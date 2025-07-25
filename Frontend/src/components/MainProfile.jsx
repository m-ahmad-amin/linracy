import { Grid2X2Check } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { usePostStore } from "../store/usePostStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainProfile({userName, allPosts, setAllPosts}) {

  const navigate = useNavigate();

  const { postCreated, setPostCreated } = usePostStore();

  // const [allPosts, setAllPosts] = useState([])

  const getPosts = async () => {
    const res = await axiosInstance.get(`/profile/${userName}/posts`)

    const posts = res.data.posts;
    setAllPosts(posts);
  }

  useEffect(() => {
  getPosts();

  if (postCreated) {
    setPostCreated(false);
  }
}, [postCreated]);

  return (
    <>
      <div className="flex justify-center pb-2">
        <div className="flex flex-wrap gap-1 w-[100%] md:w-[90%] justify-center items-center">
          <div className="flex gap-2 w-full m-2 md:m-4">
            <Grid2X2Check className="md:w-10 md:h-10" />
            <h1 className="md:text-xl font-bold self-center">All Posts</h1>
          </div>
          {allPosts.map((postElement, index) => {
            return (
            <img key={index}
            onClick={(e) => {
                navigate("/full", {state: {clickedPost: postElement}})
              }}
            src={postElement.uploadedURL}
            className="w-[32%]
            aspect-[3/4]
            object-cover
            hover:cursor-pointer"></img>
            )
          })}
        </div>
      </div>
      <hr></hr>
    </>
  );
}
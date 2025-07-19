import { Grid2X2Check } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { usePostStore } from "../store/usePostStore";
import { useEffect } from "react";

export default function MainProfile({userName, allPosts, setAllPosts}) {

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
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-1 w-[90%] justify-center">
          <div className="flex gap-2 w-full m-2 md:m-4">
            <Grid2X2Check className="md:w-10 md:h-10" />
            <h1 className="md:text-xl font-bold self-center">All Posts</h1>
          </div>
          {/* <img
            src="https://res.cloudinary.com/dzzrxqiho/image/upload/v1752450078/cld-sample.jpg"
            className="w-[32%]
            object-cover"
          ></img> */}
          {allPosts.map((postElement, index) => {
            return (
            <img key={index}
            src={postElement.uploadedURL}
            className="w-[32%]
            object-cover"></img>
            )
          })}
        </div>
      </div>
    </>
  );
}

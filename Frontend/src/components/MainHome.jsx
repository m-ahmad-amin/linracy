import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function MainHome() {
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    const res = await axiosInstance.get(`/profile/posts`);

    const posts = res.data.posts;
    
    setAllPosts(posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
        <>
        <div className="flex flex-col items-center">
            {allPosts.map((postElement, index) => {
            return (
                <>
                 <img key={index}
            src={postElement.profilePicture}
            className="w-12 h-12
            border-2
            rounded-full
            hover:cursor-pointer
            object-cover"></img>
                 <h1>{postElement.userName}</h1>
            <img key={index}
            src={postElement.uploadedURL}
            className="w-[100%] md:w-[62%]
             border-gray-300 md:border border-y
            md:rounded
            hover:cursor-pointer
            object-cover"></img>
          </>
            )
          })}
          </div>
        </>
  );
}

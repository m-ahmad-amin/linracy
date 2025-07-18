import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp } from "lucide-react";

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
        <div className="w-[100%] md:w-[62%] flex flex-col items-center">
          {allPosts.map((postElement, index) => {
            return (
              <>
              <div className="flex justify-between self-start w-full">
                <div className="flex self-start pl-2 pt-2 pb-2">
                  <img
                    key={index}
                    src={postElement.profilePicture}
                    className="w-12 h-12
                    border-2
                    rounded-full
                    hover:cursor-pointer
                    object-cover"
                  ></img>
                  <h1 className="p-2 font-semibold">{postElement.userName}</h1>
                </div>

                <div className="p-4">
                  <h1>
                    {formatDistanceToNow(new Date(postElement.createdAt), {
                      addSuffix: true,
                    })}
                  </h1>
                </div>
                </div>

                <h1 className="self-start pl-2 break-words">
                  {postElement.caption}
                </h1>

                <img
                  key={index}
                  src={postElement.uploadedURL}
                  className="w-[100%]
             border-gray-300 md:border border-y
            md:rounded
            hover:cursor-pointer
            object-cover"
                ></img>



                <div className="flex w-full p-2 gap-[5%] items-center">
                    <ThumbsUp className="text-gray-400 scale-150 pl-1 hover:cursor-pointer hover:text-gray-700 hover:scale-125 transition-all" />
                        <label for="comment" className="border-2 border-gray-400 w-full p-2 ring-2 ring-transparent focus-within:ring-gray-700 focus-within:border-transparent rounded-xl">
                                <input id="comment" placeholder="Comment..." className="w-[97%] focus:outline-none"></input>
                        </label>
                </div>


              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

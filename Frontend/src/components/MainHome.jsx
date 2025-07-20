import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function MainHome() {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    const res = await axiosInstance.get(`/profile/posts`);

    const posts = res.data.posts;

    setAllPosts(posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const { authUser } = useAuthStore();

  return (
    <div className="pt-20 md:pt-2">
      <div className="flex flex-col items-center">
        <div className="w-[100%] md:w-[62%] flex flex-col items-center">
          {allPosts.map((postElement, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between self-start w-full">
                  <div className="flex self-start pl-2 pt-2 pb-2">
                    <img
                      src={postElement.profilePicture}
                      className="w-12 h-12
                    border-2
                    rounded-full
                    hover:cursor-pointer
                    object-cover"
                    ></img>
                    <h1
                      className="p-2 font-semibold hover:cursor-pointer hover:underline"
                      onClick={() => {
                        if (authUser.userName === postElement.userName) {
                          navigate("/profile");
                        } else {
                          navigate("/othersProfile", { state: { userName: postElement.userName, profilePicture: postElement.profilePicture, page: "" } });
                        }
                      }}
                    >
                      {postElement.userName}
                    </h1>
                  </div>

                  <div className="p-4">
                    <h1 className="text-sm">
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
                  src={postElement.uploadedURL}
                  className="w-[100%]
             border-gray-300 md:border border-y
            md:rounded
            hover:cursor-pointer
            object-cover"
                ></img>

                <div className="flex w-full p-2 gap-[5%] items-center">
                  <ThumbsUp className="text-gray-400 scale-150 pl-1 hover:cursor-pointer hover:text-gray-700 hover:scale-125 transition-all" />
                  <label
                    htmlFor="comment"
                    className="border-2 border-gray-400 w-full p-2 ring-2 ring-transparent focus-within:ring-gray-700 focus-within:border-transparent rounded-xl"
                  >
                    <input
                      id="comment"
                      placeholder="Comment..."
                      className="w-[97%] focus:outline-none"
                    ></input>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

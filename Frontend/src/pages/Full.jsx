import { ArrowLeft, ThumbsUp } from "lucide-react"
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom"

export default function Full({}) {
  const location = useLocation();
  if (!location.state) {
        return (
            <h1>File not found</h1>
        )
    }
  const { clickedPost } = location.state;
    
    const navigate = useNavigate();
    
    return (
        <>
        <div className="z-50 flex flex-col md:flex-row justify-center bg-black inset-0 fixed w-[100%] h-[100%]">

          {/* <div className="flex justify-between w-full p-4 relative top-5 md:hidden">
            <div className="flex gap-4">
            <img
            src={clickedPost.profilePicture}
            className="rounded-full
            h-12 w-12"
            >
            </img>
            <h1 className="text-white font-bold">{clickedPost.userName}</h1>
            </div>



            <div className="">
                                <h1 className="text-sm text-white">
                                  {formatDistanceToNow(new Date(clickedPost.createdAt), {
                                    addSuffix: true,
                                  })}
                                </h1>
                              </div>
          </div> */}

        <div className="flex-1 flex flex-col justify-center items-center max-h-[90%] w-full overflow-hidden md:max-h-[100%]">
          <h1 className="text-white self-start p-2 md:hidden">{clickedPost.caption}</h1>
        <img
        src={clickedPost.uploadedURL}
        className="max-h-full max-w-full object-contain"
        ></img>
        </div>

        

        {/* <div className="flex w-full p-2 gap-[5%] items-center relative bottom-0 md:hidden">
                  <ThumbsUp onClick={() => {

                  }} className="text-gray-400 scale-150 pl-1 hover:cursor-pointer hover:text-gray-700 hover:scale-125 transition-all" />
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
                </div> */}
      </div>
        </>
    )
}
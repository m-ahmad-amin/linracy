import HeaderHome from "../components/HeaderHome";
import MainHome from "../components/MainHome";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
    
  return (
    <>

      {showModal && (
        <div className="flex items-center w-full justify-center fixed inset-0 z-50 bg-black/50">
          <div className="w-[90%] h-[90%] md:w-[70%] bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 pr-2">
            <X className="scale-150 p-1 hover:shadow-lg hover:bg-gray-100 hover:text-gray-700 rounded-md transition-all hover:cursor-pointer" onClick={() => {
              setShowModal(false);
            }}/>
            <label className="border border-black w-full rounded-xl p-2 focus-within:border-2">

              <input placeholder="Search" className="outline-none w-full"></input>
            </label>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center h-dvh md:justify-between">
        <div className="h-full w-[20%] hidden md:block">
          <SideBar page={"home"} showModal={showModal} setShowModal={setShowModal} />
        </div>

        <div className="md:w-[60%]">
          <HeaderHome showModal={showModal} setShowModal={setShowModal} />
          <MainHome />
        </div>

        <div className="h-full w-[20%] hidden md:block"></div>
      </div>
    </>
  );
}

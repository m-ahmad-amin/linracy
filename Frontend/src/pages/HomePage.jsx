import HeaderHome from "../components/HeaderHome";
import MainHome from "../components/MainHome";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const { authUser } = useAuthStore();
  const [page, setPage] = useState("home");
  const [searchUsers, setSearchUsers] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    setSearchUsers(e.target.value);
  };

  const getUsers = async () => {
    try {
      const res = await axiosInstance.post("/profile/search", {
        userName: searchUsers,
      });

      console.log(res.data.users)
      setSearchedUsers(res.data.users);
    } catch (error) {}
  };

    useEffect(() => {
    if (location.state?.openSearchModal) {
      setShowModal(true);
      setPage("search");
    }
  }, [location.state]);

  useEffect(() => {
    if (searchUsers !== "") {
      getUsers();
    } else {
      setSearchedUsers([]);
    }
  }, [searchUsers]);

  return (
    <>
      {showModal && (
        <div className="flex items-center w-full justify-center fixed inset-0 z-50 bg-black/50">
          <div className="w-[95%] h-[95%] md:w-[70%] bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 pr-2 pb-5">
              <X
                className="scale-150 p-1 hover:shadow-lg hover:bg-gray-100 hover:text-gray-700 rounded-md transition-all hover:cursor-pointer"
                onClick={() => {
                  setShowModal(false);
                  setPage("home")
                }}
              />
              <label className="flex border border-black w-full rounded-xl p-2 focus-within:border-2">
                <input
                  value={searchUsers}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="outline-none w-full"
                ></input>
                <Search />
              </label>
            </div>

            <div className="w-full">
              {searchedUsers.map((user) => {
                return (
                  <div onClick={() => {
                    if (authUser.userName === user.userName) {
                          navigate("/profile");
                        } else {
                          setPage("search")
                          navigate("/othersProfile", { state: { userName: user.userName, profilePicture: user.profilePic, page: page } });
                        }
                  }} key={user._id} className="flex p-2 gap-4 rounded-xl hover:cursor-pointer transition-all hover:bg-gray-200">
                    <img
                      src={user.profilePic}
                      className="rounded-full w-12 h-12"
                    ></img>
                    <div>
                      <h1 className="font-bold text-sm">{user.userName}</h1>
                      <h1 className="text-sm">{user.fullName}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center h-dvh md:justify-between">
        <div className="h-full w-[20%] hidden md:block">
          <SideBar
            page={page}
            showModal={showModal}
            setShowModal={setShowModal}
            setPage={setPage}
          />
        </div>

        <div className="md:w-[60%]">
          <HeaderHome showModal={showModal} setShowModal={setShowModal} setPage={setPage} />
          <MainHome />
        </div>

        <div className="h-full w-[20%] hidden md:block"></div>
      </div>
    </>
  );
}

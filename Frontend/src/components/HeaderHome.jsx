import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function HeaderHome() {

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    }

  return (
    <div className="fixed bg-white md:hidden w-full">
      <div className="flex justify-between p-3 items-center md:p-3 md:justify-center">
        <img src={logo} alt="Linracy" className="w-[30%] h-auto md:w-[25%] md:pt-2" />
        <div className="flex items-center gap-3 md:hidden">
            <Search className="text-gray-500 w-8 h-8" />
            <img
            onClick={handleProfileClick}
          src="https://res.cloudinary.com/dzzrxqiho/image/upload/v1752450074/samples/two-ladies.jpg"
          alt="profile pic"
          className="object-cover rounded-full w-10 h-10"
        ></img>
        </div>
      </div>

      <hr className="mt-1"></hr>
    </div>
  );
}

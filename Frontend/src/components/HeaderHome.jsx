import logo from "../assets/logo.png";
import { Search } from "lucide-react";

export default function HeaderHome() {
  return (
    <>
      <div className="flex justify-between p-4 items-center md:p-0 md:justify-center">
        <img src={logo} alt="Linracy" className="w-2/5 h-auto md:w-[30%]" />
        <div className="flex items-center gap-3 md:hidden">
            <Search className="text-gray-500 w-10 h-10" />
            <img
          src="https://res.cloudinary.com/dzzrxqiho/image/upload/v1752450074/samples/two-ladies.jpg"
          alt="profile pic"
          className="object-cover rounded-full w-12 h-12"
        ></img>
        </div>
      </div>
    </>
  );
}

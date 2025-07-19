import {toast} from "react-hot-toast";
import { axiosInstance } from "../lib/axios"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Logout() {

    const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");

            toast.success("Log out success")
            checkAuth();
            navigate("/login");
        } catch (error) {
            if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
        }
    }

    return (
        <>
            <button onClick={handleClick}>log out</button>
        </>
    )
}
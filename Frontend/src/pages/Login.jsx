import Input from "../components/Input.component";
import logo from "../assets/logo.png";
import Particles from "./Particles";
import Button from "../components/Button";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const handleSignInButton = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        userName: userData.userName,
        password: userData.password,
      });

      toast.success("login successful");
      checkAuth();
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
    }
  };

  function handleCreate() {
    navigate("/signup");
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 h-dvh" style={{ width: "100%" }}>
        <Particles
          // particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="relative z-10 h-dvh flex flex-col top-10 gap-16 p-10 md:flex-row md:justify-evenly md:-top-20 items-center flex-wrap">
        <div className="relative">
          <img src={logo} alt="Linracy" />
        </div>

        <div className="flex flex-col gap-2 relative rounded-lg">
          <Input
            placeholder={"Username"}
            type="text"
            value={userData.userName}
            setUserData={setUserData}
            name={"userName"}
          />

          <Input
            placeholder={"Password"}
            type="password"
            value={userData.password}
            setUserData={setUserData}
            name={"password"}
          />

          <Button handleClick={handleSignInButton} name={"Log in"} />

          <h1
            onClick={handleCreate}
            className="text-center text-sm md:text-lg hover:cursor-pointer hover:text-blue-700"
          >
            New to Linracy? Create Account
          </h1>
        </div>
      </div>
    </div>
  );
}

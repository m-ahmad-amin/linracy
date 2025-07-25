import Input from "../components/Input.component";
import logo from "../assets/logo.png";
import Particles from "./Particles";
import Button from "../components/Button";
import { use, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function Signup() {
  const {checkAuth} = useAuthStore()
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
  });

  const handleSignUpButton = async () => {
    try {
      const res = await axiosInstance.post("/auth/signup", {
        email: userData.email,
        fullName: userData.fullName,
        userName: userData.userName,
        password: userData.password,
      });

      toast.success("sign up success");
      checkAuth();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

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
            placeholder={"Email"}
            type="text"
            vlaue={userData.email}
            setUserData={setUserData}
            name={"email"}
          />

          <Input
            placeholder={"Full Name"}
            type="text"
            value={userData.fullName}
            setUserData={setUserData}
            name={"fullName"}
          />

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

          <Button handleClick={handleSignUpButton} name={"Sign Up"} />

          <h1 className="text-center text-sm md:text-lg hover:cursor-pointer">
            Already have an account?
          </h1>
        </div>
      </div>
    </div>
  );
}

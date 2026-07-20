import Input from "../components/Input.component";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function Signup() {
  const { checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    fullName: "",
    userName: "",
    password: "",
  });

  const handleSignUpButton = async () => {
    try {
      await axiosInstance.post("/auth/signup", {
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
    <div className="relative min-h-dvh overflow-hidden bg-[#f3f4f6]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 12% 18%, rgba(230, 57, 70, 0.07), transparent 55%), radial-gradient(ellipse 60% 45% at 88% 82%, rgba(100, 116, 139, 0.08), transparent 50%), linear-gradient(160deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center gap-12 px-6 py-12 md:flex-row md:justify-between md:gap-16 md:px-10">
        <div className="flex max-w-md flex-col items-center text-center md:items-start md:text-left">
          <img
            src={logo}
            alt="Linracy"
            className="mb-6 h-auto w-48 object-contain md:w-64"
          />
          <p className="text-base leading-relaxed text-[#4b5563] md:text-lg">
            Create your account and join the Linracy community.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="flex flex-col gap-4 border border-[#d6d3d1] bg-white/80 px-6 py-8 backdrop-blur-sm md:px-8">
            <div className="mb-2">
              <h1 className="text-2xl font-semibold tracking-tight text-[#1c1917]">
                Create account
              </h1>
              <p className="mt-1 text-sm text-[#78716c]">
                Fill in your details to get started
              </p>
            </div>

            <Input
              placeholder={"Email"}
              type="text"
              value={userData.email}
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

            <p
              onClick={() => {
                navigate("/login");
              }}
              className="mt-1 text-center text-sm text-[#57534e] transition-colors hover:cursor-pointer hover:text-[#e63946] md:text-base"
            >
              Already have an account? Log in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

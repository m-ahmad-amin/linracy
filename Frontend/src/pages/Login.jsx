import Input from "../components/Input.component";
import logo from "../assets/logo.png";
import Button from "../components/Button";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const { checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const handleSignInButton = async () => {
    try {
      await axiosInstance.post("/auth/login", {
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
            Sign in to continue to your account and stay connected.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="flex flex-col gap-4 border border-[#d6d3d1] bg-white/80 px-6 py-8 backdrop-blur-sm md:px-8">
            <div className="mb-2">
              <h1 className="text-2xl font-semibold tracking-tight text-[#1c1917]">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-[#78716c]">
                Enter your credentials to log in
              </p>
            </div>

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

            <p
              onClick={handleCreate}
              className="mt-1 text-center text-sm text-[#57534e] transition-colors hover:cursor-pointer hover:text-[#e63946] md:text-base"
            >
              New to Linracy? Create Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

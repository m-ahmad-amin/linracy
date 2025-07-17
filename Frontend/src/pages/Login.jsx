import Input from "../components/Input.component";
import logo from "../assets/logo.png";
import Particles from "./Particles";
import Button from "../components/button";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

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
          <Input placeholder={"Username"} type="text" />

          <Input placeholder={"Password"} type="password" />

          <Button name={"Log in"} />

          <h1 onClick={handleCreate} className="text-center text-sm md:text-lg hover:cursor-pointer hover:text-blue-700">New to Linracy? Create Account</h1>
        </div>
      </div>
    </div>
  );
}
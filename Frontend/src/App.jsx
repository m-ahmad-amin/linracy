import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Add from "./pages/Add";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';

import {useAuthStore} from "./store/useAuthStore"
import { useEffect } from "react";

function App() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
    <div className="h-dvh flex justify-center items-center">
      <Loader className="size-10 animate-spin" />
      </div>)
  }


  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/"/>} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/"/>} />
        <Route path="/add" element={authUser ? <Add /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

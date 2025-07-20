import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Logout from "./pages/Logout";
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';

import {useAuthStore} from "./store/useAuthStore"
import { useEffect } from "react";
import OthersProfile from "./pages/OthersProfile";

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
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/othersProfile" element={authUser ? <OthersProfile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authUser ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/logout" element={authUser ? <Logout /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1>File not found</h1>} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

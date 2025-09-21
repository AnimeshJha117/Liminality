import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {useAuthStore} from "./store/useAuthStore";

function App() {
  const {authUser, login, isLoggedIn} = useAuthStore();
  console.log("auth user: ", authUser);
  console.log("isLoading: ", isLoggedIn);
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="../public/black-hole.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag
      </video>
      <button onClick = {login} className = "z-10">Log In</button>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/*<video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dhnvnf5cj/video/upload/v1760277339/black-hole_xzkzke.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag
      </video>*/}

      <img 
        src="https://res.cloudinary.com/dhnvnf5cj/image/upload/v1760278562/black-hole_mxdwti.png" 
        alt="black-hole" 
        className="absolute top-0 left-0 w-full h-full object-cover" 
      />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AnimatedBorderContainer from "../components/AnimatedBorderContainer";
import { LoaderIcon } from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({emailOrusername: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return <div className="relative flex items-center justify-center min-h-screen">
    <AnimatedBorderContainer>
      <div className="relative z-10 w-[500px] p-8 rounded-xl bg-black/20 backdrop-blur-md shadow-lg">
        <h1 className="text-center text-3xl mb-6 text-white drop-shadow-md">Welcome to Liminality</h1>
        <p className="text-center text-30px text-white/80 mb-6">Login to verify clearance</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/Email/}
          <div>
            <label className="auth-input-label">Email / Username</label>
            <input type="text" value={formData.emailOrusername} onChange={(e) => setFormData({ ...formData, emailOrusername: e.target.value })} className="input" />
          </div>

          {/Password/}
          <div>
            <label className="auth-input-label">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input" />
          </div>

          {/Create button/}
          <button type="submit" className="auth-btn" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <LoaderIcon className="w-full h-5 animate-spin text-center" />
            ) : (
              "Sign In"
            )}
          </button>

          {/Already registered/}
          <div className="text-center text-50px text-white/80 mt-4 drop-shadow-md">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-400 hover:underline hover:text-blue-300"
            >
              Sign Up
            </a>
          </div>

        </form>
      </div>
    </AnimatedBorderContainer>
  </div>
};
export default LoginPage;

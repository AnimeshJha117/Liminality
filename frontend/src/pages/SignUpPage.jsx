import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AnimatedBorderContainer from "../components/AnimatedBorderContainer";
import { LoaderIcon } from "lucide-react";

function SignUpPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();
  const handleSubmit =  (e) => {
    e.preventDefault();
    signup(formData);
  };
  return <div className="relative flex items-center justify-center min-h-screen">
    <AnimatedBorderContainer>
      <div className="relative z-10 w-[500px] p-8 rounded-xl bg-white/20 backdrop-blur-md shadow-lg">
        <h1 className="text-center text-3xl mb-6 text-black drop-shadow-md">Welcome to Liminality</h1>
        <p className="text-center text-30px text-black/80 mb-6">Register to obtain clearance</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/*Username*/}
          <div>
            <label className="auth-input-label">Username</label>
            <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="input" />
          </div>

          {/*Email*/}
          <div>
            <label className="auth-input-label">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input" />
          </div>

          {/*Password*/}
          <div>
            <label className="auth-input-label">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input" />
          </div>

          {/*Create button*/}
          <button type="submit" className="auth-btn" disabled={isSigningUp}>
            {isSigningUp ? (
              <LoaderIcon className="w-full h-5 animate-spin text-center" />
            ) : (
              "SignUp"
            )}
          </button>

          {/*Already registered*/}
          <div className="text-center text-50px text-black/80 mt-4 drop-shadow-md">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-400 hover:underline hover:text-blue-300"
            >
              Log In
            </a>
          </div>

        </form>
      </div>
    </AnimatedBorderContainer>
  </div>;
};
export default SignUpPage;
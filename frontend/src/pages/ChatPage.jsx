import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return <div className="relative flex items-center justify-center min-h-screen">
    <div className="z-10">
      <button onClick={logout}>Logout</button>
    </div>
  </div> 
};
export default ChatPage;
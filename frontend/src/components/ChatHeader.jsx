import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader({ setSidebarOpen }) {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="p-4 sm:p-6 border-b border-slate-700/50 overflow-hidden">
      <div className="flex items-center justify-between gap-4">

        {/*Left*/}
        <div className="flex items-center gap-1 min-w-0 flex-1">
          {/*Avatar*/}
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/*Username and Status*/}
          <div className="flex flex-col min-w-0 ml-1">
            <h3
              className="text-white font-medium text-lg truncate"
              title={selectedUser.username}
            >
              {selectedUser.username}
            </h3>

            <p className="text-slate-400 text-sm truncate">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatHeader;

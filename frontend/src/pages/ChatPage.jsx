import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import { useState, useEffect } from "react";

const MenuPlaceholder = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const ClosePlaceholder = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="6" y1="18" x2="18" y2="6" />
  </svg>
);

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Close sidebar
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset sidebar when switching to large screens
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    function handler(e) {
      if (e.matches) setSidebarOpen(false);
    }
    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 backdrop-blur-sm">
      <div
        className="relative z-10 flex w-full max-w-[1360px] rounded-xl overflow-hidden bg-black/10 backdrop-blur shadow-2xl border border-white/30"
        style={{ minHeight: "60vh", height: "min(90vh, 768px)" }}
      >

        <div className="lg:hidden fixed top-4 right-4 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-black/40 backdrop-blur hover:bg-black/60 border border-white/20"
          >
            <MenuPlaceholder className="w-6 h-6 text-white" />
          </button>
        </div>

        {/*sidebar*/}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-80 transform transition-transform duration-300 ease-in-out
            bg-black/30 backdrop-blur-sm flex flex-col
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:translate-x-0 lg:static
          `}
        >
          {/*close button*/}
          <div className="flex items-center justify-end px-3 py-2 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <ClosePlaceholder className="h-5 w-5 text-white" />
            </button>
          </div>

          {/*components*/}
          <div className="px-3">
            <ProfileHeader />
            <ActiveTabSwitch />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList onSelectChat={() => setSidebarOpen(false)} /> : <ContactList onSelectContact={() => setSidebarOpen(false)} />}
          </div>
        </aside>

        {/*Mobile overlay*/}
        {sidebarOpen && (
          <button
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/*main area*/}
        <div className="flex-1 flex flex-col bg-black/25 backdrop-blur-sm">
          {/*chat area*/}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (<ChatContainer setSidebarOpen={setSidebarOpen} />) : (<NoConversationPlaceholder onOpenSidebar={() => setSidebarOpen(true)}
            />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatPage;
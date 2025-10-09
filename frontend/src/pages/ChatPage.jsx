import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  return <div className="relative flex items-center justify-center min-h-screen">
    <div className="relative z-10 flex w-[1360px] h-[768px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-x1 shadow-2xl border border-white/30">
      {/*Left Side*/}
      <div className="w-80 bg-white/30 backdrop-blur-sm flex flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
      </div>

      {/*Right Side*/}
      <div className="flex-1 flex flex-col bg-white/25 backdrop-blur-sm">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  </div>
};
export default ChatPage;
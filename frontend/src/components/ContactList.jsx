import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList({ onSelectContact }) {
    const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    const [query, setQuery] = useState("");
    useEffect(() => {
        if (!query.trim()) {
            // Load all contacts OR clear search
            getAllContacts("");
        }
    }, [query, getAllContacts]);

    const handleSearch = () => {
        if (!query.trim()) return;
        getAllContacts(query);
    };

    return (
        <div className="space-y-3">
            {/* Search bar */}
            <div className="p-2 bg-black/20 rounded-md -ml-4">
                <div className="flex items-center">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search username..."
                        className="flex-1 px-4 py-2 bg-slate-800/50 text-white placeholder:text-slate-400
                 border border-slate-700/50 rounded-l-md focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-5 py-2 bg-cyan-600 text-white hover:bg-cyan-700 rounded-r-md border border-slate-700/50 border-l-0">
                        Search
                    </button>
                </div>
            </div>

            {/* Loading */}
            {isUsersLoading && <UsersLoadingSkeleton />}

            {/*search res*/}
            {allContacts.map((contact) => (
                <div
                    key={contact._id}
                    className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20"
                    onClick={() => {
                        setSelectedUser(contact);
                        onSelectContact?.();
                    }}>
                    <div className="flex items-center gap-3">
                        <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
                            <div className="size-12 rounded-full">
                                <img src={contact.profilePic || "/avatar.png"} />
                            </div>
                        </div>
                        <h4 className="text-slate-200 font-medium">{contact.username}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default ContactList;
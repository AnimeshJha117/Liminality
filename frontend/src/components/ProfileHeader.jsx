import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");
function ProfileHeader() {
    const { logout, authUser, updateProfile } = useAuthStore();
    const { isSoundEnabled, toggleSound } = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="p-4 sm:p-6 border-b border-slate-700/50 overflow-hidden">
            <div className="flex items-center justify-between gap-4">
                {/*LEFT*/}
                <div className="flex items-center gap-1 min-w-0 flex-1">
                    {/*Avatar*/}
                    <div className="avatar online">
                        <button
                            type="button"
                            className="w-16 h-16 rounded-full overflow-hidden relative group flex-shrink-0"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="User avatar"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">Change</span>
                            </div>
                        </button>

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                        />
                    </div>

                    {/*USERNAME + STATUS*/}
                    <div className="flex flex-col min-w-0">
                        <h3
                            className="text-white font-medium text-lg truncate"
                            title={authUser.username}
                        >
                            {authUser.username}
                        </h3>
                        <p className="text-slate-400 text-sm truncate">Online</p>
                    </div>
                </div>

                {/*RIGHT*/}
                <div className="flex items-center gap-3 flex-shrink-0">
                    {/*Logout*/}
                    <button
                        onClick={logout}
                        className="p-0.5 rounded-md hover:bg-white/5 transition-transform hover:scale-105"
                        title="Logout"
                    >
                        <LogOutIcon className="w-5 h-5 text-white" />
                    </button>

                    {/*Sound*/}
                    <button
                        onClick={() => {
                            try {
                                mouseClickSound.currentTime = 0;
                                mouseClickSound.play();
                            } catch { }
                            toggleSound();
                        }}
                        className="p-0.5 rounded-md hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors hidden xs:inline-flex sm:inline-flex"
                        title={isSoundEnabled ? "Mute" : "Unmute"}
                    >
                        {isSoundEnabled ? (
                            <Volume2Icon className="w-5 h-5 text-white" />
                        ) : (
                            <VolumeOffIcon className="w-5 h-5 text-slate-300" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProfileHeader;

import { useContext, useMemo } from "react";
import { AvatarContext } from "../contexts";

export default function useAvatar(defaultUrl) {
    const { userAvatar } = useContext(AvatarContext);

    // Always prefer the most recent avatar from context if it exists
    const activeAvatar = userAvatar || defaultUrl;

    const avatarURL = useMemo(() => {
        if (!activeAvatar) return null;
        return `${import.meta.env.VITE_SERVER_URL}/${activeAvatar}`;
    }, [activeAvatar]);

    return { avatarURL };
}

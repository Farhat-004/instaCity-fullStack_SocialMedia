import { useState } from "react";
import { AvatarContext } from "../contexts";
import useAuth from "../hooks/useAuth";

export default function AvatarProvider({ children }) {
    const auth = useAuth();
    const [userAvatar, setUserAvatar] = useState(auth?.user?.avatar);
    return (
        <AvatarContext value={{ userAvatar, setUserAvatar }}>
            {children}
        </AvatarContext>
    );
}

export default function useAvatar(url) {
    const avatarURL = `${import.meta.env.VITE_SERVER_URL}/${url}`;
    return { avatarURL };
}

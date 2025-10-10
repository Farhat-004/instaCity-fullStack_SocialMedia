export default function getAvatar({ avatarLink }) {
    return `${import.meta.env.VITE_SERVER_URL}/${avatarLink}`;
}

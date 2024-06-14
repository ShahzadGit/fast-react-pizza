import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return (
    <div className="font-semibold text-sm hidden sm:block">{username}</div>
  );
}

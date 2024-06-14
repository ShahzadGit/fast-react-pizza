import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="bg-yellow-500 p-4 uppercase border-b border-stone-300 flex justify-between items-center">
      <Link to="/" className="tracking-widest">
        Fast React Pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 p-3 uppercase text-sm md:text-base flex justify-between items-center">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice}</span>
        <span className="text-xs text-stone-500 capitalize">
          Courtesy: (The Ultimate React Course-UDEMAY)-A practice project
        </span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

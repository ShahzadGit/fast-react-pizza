import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation(); //This hook is used for three states when RENDER AS YOU FETCH in React Router instead of using fetch in the component's useEffect
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen  bg-stone-100">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />{" "}
          {/* Here it will display all children elements as per the routes*/}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

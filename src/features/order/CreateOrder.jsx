import { useState } from "react";
import store from "../../store";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAdress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// console.log("🚀 ~ isValidPhone:", isValidPhone);

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // const cart = fakeCart;
  const cart = useSelector(getCart);
  // console.log("🚀 ~ CreateOrder ~ cart:", cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";
  console.log("🚀 ~ CreateOrder ~ isLoadingAddress:", isLoadingAddress);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPirce = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPirce;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            defaultValue={username}
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-1 p-2 rounded-md bg-red-100 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p className="mt-1 p-2 rounded-md bg-red-100 text-xs text-red-600">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px]  top-[3px] z-50 md:right-[5px]  md:top-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAdress());
                }}
                disabled={isLoadingAddress}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-10 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-300
            focus:outline-none focus:ring
            focus:ring-yellow-300 focus:ring-offset-2
            "
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for: ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData(); //formData is a browser based Web API
  const data = Object.fromEntries(formData); // converts formData into key-value object
  // console.log("data: ", data);
  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart), //Converts the stringified data from the request into key-value object
    priority: data.priority === "true",
  };
  // console.log("newOrder: ", newOrder);

  const errors = {};
  if (!isValidPhone(newOrder.phone))
    errors.phone =
      "Please enter a valid phone #. It is required to contact you!";

  // if (Object.keys(errors).length > 0) return errors;

  const savedOrder = await createOrder(newOrder);
  // console.log("SavedOrder: ", savedOrder);
  store.dispatch(clearCart());
  return redirect(`/order/${savedOrder.id}`); //Provided by React Router to navigate to a specific URL
}

export default CreateOrder;

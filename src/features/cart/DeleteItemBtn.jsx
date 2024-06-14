import { useDispatch } from "react-redux";

import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

export default function DeleteItemBtn({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

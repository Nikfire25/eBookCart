import { OrderSuccess } from "./components/OrderSuccess";
import { OrderFail } from "./components/OrderFail";
import { useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

export const OrderPage = () => {
  const { state } = useLocation();
  const status = state.status;
  useTitle("Orders");

  return (
    <main>
      {status ? (
        <OrderSuccess user={state.user} id={state.data.id} />
      ) : (
        <OrderFail />
      )}
    </main>
  );
};

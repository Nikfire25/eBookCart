import { useEffect, useState } from "react";
import { useCart } from "../../../context";
import { useNavigate } from "react-router-dom";
import { getUser, createOrder } from "../../../services";
import { toast } from "react-toastify";

export const Checkout = ({ setCheckout }) => {
  const navigate = useNavigate();
  const { cartList = [], total, clearCart } = useCart();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ebid = JSON.parse(sessionStorage.getItem("ebid"));
  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    if (!ebid || !token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [ebid, token]);

  if (loading || !user) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createOrder(cartList, total, user);
      toast.success("Order Placed");
      clearCart();
      navigate("/order-summary", {
        replace: true,
        state: { status: true, user: user, data },
      });
      setCheckout(false);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message);
      navigate("/order-summary", {
        replace: true,
        state: { status: false },
      });
    }
  };

  return (
    <section>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <div className="relative p-6 w-full max-w-md rounded-lg shadow bg-white dark:bg-dark">
          <button
            onClick={() => setCheckout(false)}
            className="absolute top-3 right-3 text-gray-500 dark:text-gray-300"
          >
            ✕
          </button>

          <h3 className="mb-6 text-xl font-semibold text-center dark:text-white">
            CARD PAYMENT
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              disabled
              value={user.name}
              className="w-full p-2.5 rounded bg-gray-100 dark:bg-slate-700 dark:text-white"
            />

            <input
              disabled
              value={user.email}
              className="w-full p-2.5 rounded bg-gray-100 dark:bg-slate-700 dark:text-white"
            />

            <p className="text-2xl font-semibold text-lime-500 text-center">
              ${total}
            </p>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg"
            >
              PAY NOW
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

import { useCartStore } from "../store/cartStore";
import { CartItemCard } from "../components/CartItemCard";
import { DeleteButton } from "../components/DeleteButton";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";

export const CartPages = () => {
  const cartStorage = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4 relative">
      <div className="absolute right-4 top-4">
        <DeleteButton onClick={() => clearCart()} />
      </div>
      <h1 className="text-3xl mb-6  font-medium">Twoje zamówienie</h1>

      {cartStorage.length === 0 ? (
        <div className="flex  items-center gap-2 text-lg text-gray-500">
          <p>Koszyk jest pusty</p> <FaShoppingCart />
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cartStorage.map((item, index) => (
              <CartItemCard key={index} item={item} />
            ))}
          </div>

          <div className="flex flex-col items-end gap-5">
            <h2 className="text-2xl  font-semibold">
              Suma:{" "}
              <span className="text-green-600">
                {getTotalPrice().toFixed(2)} zł
              </span>
            </h2>
            <button
              onClick={() => navigate("/user")}
              className={`text-2xl bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700  text-white px-3 py-1 rounded-4xl `}
            >
              Zamów
            </button>
          </div>
        </>
      )}
    </div>
  );
};

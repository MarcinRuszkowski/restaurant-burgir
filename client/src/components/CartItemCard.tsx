import React from "react";
import img from "../assets/img.png";
import { QuantityButton } from "./QuantityButton";
import { CartItem } from "../types/types";
import { useCartStore } from "../store/cartStore";
import { DeleteButton } from "./DeleteButton";

interface CartItemCardProps {
  item: CartItem;
}
export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { dish, quantity, bun, doneness, extras } = item;

  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

  const totalItemPrice = (dish.price + extrasTotal) * quantity;

  return (
    <div className="flex flex-row items-center border-2 rounded-4xl p-2 h-fit gap-5 relative">
      <div className="absolute top-5 right-5">
        <QuantityButton
          quantity={quantity}
          setQuantity={(newQty) => updateQuantity(item, newQty)}
        />
      </div>
      <div className="absolute bottom-5 right-5">
        <DeleteButton
          onClick={() => {
            removeFromCart(item);
          }}
        />
      </div>

      <img src={img} alt="product" className="size-[200px] rounded-3xl" />

      <div className="flex flex-col gap-3 text-start">
        <h1 className="font-bold text-3xl">{dish.name}</h1>

        <p className="text-md">
          <span className="font-semibold">Bułka:</span> {bun}
        </p>
        <p className="text-md">
          <span className="font-semibold">Wysmażenie:</span> {doneness}
        </p>

        {extras.length > 0 && (
          <div>
            <span className="font-semibold">Dodatki:</span>{" "}
            {extras.map((extra) => extra.name).join(", ")}
          </div>
        )}

        <p className="font-bold text-xl">
          Cena:{" "}
          <span className="text-green-600 ">{totalItemPrice.toFixed(2)}</span>{" "}
          zł
        </p>
      </div>
    </div>
  );
};

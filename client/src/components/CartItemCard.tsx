import React from "react";

import img from "../assets/img.png";
import { QuantityButton } from "./QuantityButton";

interface CartItemCardProps {
  name: string;
  desc: string;
  price: number;
  img?: string;
  quantity: number;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  name,
  desc,
  price,
  quantity = 1,
}) => {
  return (
    <div className="flex flex-row items-center border-2 rounded-4xl p-2 h-fit gap-5 relative">
      <div className=" absolute top-5 right-5">
        <QuantityButton initQuantity={quantity} />
      </div>

      <img src={img} alt="product" className="size-[200px] rounded-3xl" />
      <div className="flex flex-col gap-8 text-start">
        <h1 className="font-bold text-3xl">{name.toUpperCase()}</h1>

        <p>{desc}</p>
        <span>{price}</span>
      </div>
    </div>
  );
};

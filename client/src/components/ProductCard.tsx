import React from "react";
import img from "../assets/img.png";
import { IoAddCircleOutline } from "react-icons/io5";

interface ProductCardProps {
  name: string;
  desc: string;
  price: number;
  img?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  desc,
  price,
}) => {
  return (
    <div className="flex flex-row items-center border-2 rounded-4xl p-2 h-fit gap-5 relative">
      <button
        title="dodaj do koszyka"
        className="absolute text-4xl top-5 right-5 hover:text-yellow-500"
      >
        <IoAddCircleOutline />
      </button>
      <img src={img} alt="product" className="size-[200px] rounded-4xl" />
      <div className="flex flex-col gap-8 text-start">
        <h1 className="font-bold text-3xl">{name.toUpperCase()}</h1>
        <p>{desc}</p>
        <span>{price}</span>
      </div>
    </div>
  );
};

import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";

interface QuantityButtonProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  setQuantity,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <button
        title="Dodaj jedną sztukę"
        className="hover:text-green-500 active:text-green-600 text-[42px]"
        onClick={() => setQuantity(quantity + 1)}
      >
        <IoAddCircleOutline />
      </button>
      <span>{quantity}</span>
      <button
        title="odejmij jedną sztukę"
        className=" hover:text-red-500 text-4xl active:text-red-600"
        disabled={quantity <= 1}
        onClick={() => setQuantity(quantity - 1)}
      >
        <FiMinusCircle />
      </button>
    </div>
  );
};

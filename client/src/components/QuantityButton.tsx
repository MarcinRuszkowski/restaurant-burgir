import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";

interface QuantityButtonProps {
  initQuantity?: number;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  initQuantity = 1,
}) => {
  const [quantity, setQuantity] = useState(initQuantity);

  return (
    <div
      className="flex flex-row gap-2 items-center
"
    >
      <button
        title="Dodaj jedną sztukę"
        className="hover:text-green-500 text-[42px]"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        <IoAddCircleOutline />
      </button>
      <span>{quantity}</span>
      <button
        title="odejmij jedną sztukę"
        className=" hover:text-red-500 text-4xl "
        disabled={quantity <= 1}
        onClick={() => setQuantity((prev) => prev - 1)}
      >
        <FiMinusCircle />
      </button>
    </div>
  );
};

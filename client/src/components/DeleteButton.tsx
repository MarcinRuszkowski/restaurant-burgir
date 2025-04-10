import React from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      title="usuń produkt"
      className="text-yellow-500 hover:text-yellow-600 active:text-yellow-700 "
    >
      <FaTrash />
    </button>
  );
};

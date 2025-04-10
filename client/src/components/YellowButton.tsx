import React from "react";

interface YellowButtonProps {
  text: string;
  type: "submit" | "reset" | "button";
  className?: string;
  onClick: () => void;
}

export const YellowButton: React.FC<YellowButtonProps> = ({
  text,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-2xl bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700  text-white px-3 py-1 rounded-4xl ${className}`}
    >
      {text}
    </button>
  );
};

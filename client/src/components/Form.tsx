import React from "react";
import { Input } from "../types/types";

interface FormProps {
  inputs: Input[];
}

export const Form: React.FC<FormProps> = ({ inputs }) => {
  return (
    <form className="space-y-4 w-full">
      {inputs.map((input) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={input.name} className="ml-3">
            {input.name}
          </label>
          <input
            title={input.title}
            name={input.name}
            type={input.type || "text"}
            className="border-2 rounded-4xl py-1 px-3"
            placeholder={input.placeholder}
          />
        </div>
      ))}
    </form>
  );
};

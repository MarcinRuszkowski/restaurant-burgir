import React, { useState } from "react";
import { FormInput } from "../types/types";

interface FormProps {
  inputs: FormInput[];
  buttonLabel: string;
  buttonClassName: string;
  toggleLink?: string;
  toggle?: () => void;
  onSubmit: (data: { [key: string]: string }) => void;
}

export const Form: React.FC<FormProps> = ({
  inputs,
  buttonLabel,
  buttonClassName,
  toggleLink,
  toggle,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <div className="flex flex-col gap-2" key={input.name}>
          <label htmlFor={input.name} className="ml-3">
            {input.name}
          </label>
          <input
            title={input.title}
            name={input.name}
            type={input.type || "text"}
            value={formData[input.name] || ""}
            onChange={handleInputChange}
            className="border-2 rounded-4xl py-1 px-3 focus:outline-none"
            placeholder={input.placeholder}
            required
          />
        </div>
      ))}
      <p className="ml-3 mt-1" onClick={toggle}>
        {toggleLink}
      </p>
      <button type="submit" className={buttonClassName}>
        {buttonLabel}
      </button>
    </form>
  );
};

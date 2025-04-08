import React, { useState } from "react";
import { useExtras } from "../hooks/useExtras";
import { QuantityButton } from "./QuantityButton";

interface DetailsCardProps {
  dishName: string;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ dishName }) => {
  const { data, isLoading, error } = useExtras();

  const bunOptions = ["Classic", "Whole Grain", "Gluten Free"];
  const donenessOptions = ["Rare", "Medium Rare", "Well Done"];

  const [selectedBun, setSelectedBun] = useState<string | null>(null);
  const [selectedDoneness, setSelectedDoneness] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const handleExtraChange = (id: string) => {
    setSelectedExtras((prev) => [...prev, id]);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <div className="flex flex-col items-start justify-center gap-5 bg-white border-2 rounded-4xl w-fit p-5 ">
      <h1 className="font-bold text-5xl md:text-3xl text-green-600">
        {dishName}
      </h1>
      <section className="flex flex-col  items-start gap-3">
        <h3 className="font-bold text-3xl md:text-2xl ">Rodzaj bułki</h3>
        {bunOptions.map((bun) => (
          <div key={bun}>
            <label key={bun} className="block px-2 text-xl">
              <input
                className="px-2"
                type="checkbox"
                value={bun}
                checked={selectedBun === bun}
                onChange={() => setSelectedBun(bun)}
              />
              {` ${bun}`}
            </label>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-start gap-3">
        <h3 className="font-bold text-3xl md:text-2xl ">Stopień wysmażenia</h3>
        {donenessOptions.map((doneness) => (
          <div key={doneness}>
            <label key={doneness} className="block px-2 text-xl">
              <input
                className="px-2"
                type="checkbox"
                value={doneness}
                checked={selectedDoneness === doneness}
                onChange={() => setSelectedDoneness(doneness)}
              />
              {` ${doneness}`}
            </label>
          </div>
        ))}
      </section>
      <section className="flex flex-col items-start gap-3">
        <h3 className="font-bold text-3xl md:text-2xl ">Dodatki</h3>
        {data.map((item) => (
          <label key={item._id} className="block px-2 text-xl">
            <input
              type="checkbox"
              value={item._id}
              checked={selectedExtras.includes(item._id)}
              onChange={() => handleExtraChange(item._id)}
            />
            {` ${item.name} - ${item.price}`}
          </label>
        ))}
      </section>
      <div className="flex flex-col items-center self-center gap-3 mt-4">
        <QuantityButton />
        <button className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white px-5 py-2 rounded-4xl">
          DODAJ DO KOSZYKA
        </button>
      </div>
    </div>
  );
};

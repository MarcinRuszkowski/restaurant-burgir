import React, { useState } from "react";
import { useExtras } from "../hooks/useExtras";
import { useCartStore } from "../store/cartStore";
import { Bun, Dish, Doneness, Extras } from "../types/types";
import { QuantityButton } from "./QuantityButton";
import { FaCheck } from "react-icons/fa";

interface DetailsCardProps {
  dish: Dish;
  setIsOpen: (val: boolean) => void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({
  dish,
  setIsOpen,
}) => {
  const { data, isLoading, error } = useExtras();
  const addToCart = useCartStore((state) => state.addToCart);

  const bunOptions: Bun[] = ["Classic", "Whole Grain", "Gluten Free"];
  const donenessOptions: Doneness[] = ["Rare", "Medium Rare", "Well Done"];

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedBun, setSelectedBun] = useState<Bun | null>(null);
  const [selectedDoneness, setSelectedDoneness] = useState<Doneness | null>(
    null
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  const handleExtraChange = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!selectedBun || !selectedDoneness) {
      alert("Wybierz bułkę i stopień wysmażenia");
      return;
    }

    const selectedExtrasDetails = data.filter((extra) =>
      selectedExtras.includes(extra._id)
    );

    const item = {
      dish,
      quantity,
      bun: selectedBun,
      doneness: selectedDoneness,
      extras: selectedExtrasDetails,
    };
    console.log(item);

    addToCart(item);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-5 bg-white  border-2 rounded-4xl w-fit p-5 ">
      <h1 className="font-bold text-5xl md:text-3xl text-green-600">
        {dish.name.toUpperCase()}
      </h1>
      <section className="flex flex-col  items-start gap-3">
        <h3 className="font-bold text-3xl md:text-2xl ">Rodzaj bułki</h3>
        {bunOptions.map((bun) => (
          <div key={bun}>
            <label className="block px-2 text-xl">
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
            <label className="block px-2 text-xl">
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
        {data.map((item: Extras) => (
          <label key={item._id} className="block px-2 text-xl">
            <input
              type="checkbox"
              value={item._id}
              checked={selectedExtras.includes(item._id)}
              onChange={() => handleExtraChange(item._id)}
            />
            {` ${item.name} + ${item.price}`}
          </label>
        ))}
      </section>
      <div className="flex flex-col items-center self-center gap-3 mt-4">
        <QuantityButton quantity={quantity} setQuantity={setQuantity} />
        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-2 px-5 py-2 rounded-4xl transition-all duration-500 ${
            added
              ? "bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
          } text-white`}
        >
          {added ? (
            <>
              <FaCheck className="w-5 h-5" />
              Dodano
            </>
          ) : (
            "DODAJ DO KOSZYKA"
          )}
        </button>
      </div>
    </div>
  );
};

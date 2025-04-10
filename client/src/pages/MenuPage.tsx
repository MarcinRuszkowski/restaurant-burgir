import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../hooks/useClickOutside";
import { DetailsCard } from "../components/DetailsCard";
import { ProductCard } from "../components/ProductCard";
import { useDishes } from "../hooks/useDishes";
import { Dish } from "../types/types";

export const MenuPage = () => {
  const { data, isLoading, error } = useDishes();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const ref = useOutsideClick(() => setIsOpen(false));

  if (isLoading) return <p>Loading dishes...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-8 text-center relative">
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-30 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-black opacity-50 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              ref={ref}
              className="relative z-20 bg-white p-2 rounded-4xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <DetailsCard dish={selectedDish} setIsOpen={setIsOpen} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <h1 className="text-3xl ml-2 mb-3 font-medium text-green-600">
          OFERTA LIMITOWANA
        </h1>
        {data
          ?.filter((dish) => dish.isLimited)
          .map((dish) => (
            <ProductCard
              key={dish.id}
              name={dish.name}
              desc={dish.description}
              price={dish.price}
              onOpen={() => {
                setSelectedDish(dish);
                setIsOpen(true);
              }}
            />
          ))}
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl ml-2 mb-3 font-medium">MENU</h1>
        {data
          ?.filter((dish) => !dish.isLimited)
          .map((dish) => (
            <ProductCard
              key={dish.id}
              name={dish.name}
              desc={dish.description}
              price={dish.price}
              onOpen={() => {
                setSelectedDish(dish);
                setIsOpen(true);
              }}
            />
          ))}
      </div>
    </div>
  );
};

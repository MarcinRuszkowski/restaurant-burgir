import { CartItemCard } from "../components/CartItemCard";
import { useDishes } from "../hooks/useDishes";

export const CartPages = () => {
  const { data, isLoading, error } = useDishes();

  if (isLoading) return <p>Loading dishes...</p>;

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="">
      <h1 className="text-3xl ml-2 mb-3 font-medium ">Twoje zamówienie</h1>
      <div className="space-y-3">
        {data.map((dish) => (
          <CartItemCard
            key={dish.id}
            name={dish.name}
            desc={"chuj"}
            price={dish.price}
          />
        ))}
      </div>
    </div>
  );
};

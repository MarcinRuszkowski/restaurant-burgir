import { ProductCard } from "../components/ProductCard";
import { useDishes } from "../hooks/useDishes";

export const MenuPage = () => {
  const { data, isLoading, error } = useDishes();

  if (isLoading) return <p>Loading dishes...</p>;

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl ml-2 mb-3 font-medium text-green-600">
          OFERTA LIMITOWANA
        </h1>
        {data
          .filter((dish) => dish.isLimited)
          .map((dish) => (
            <ProductCard
              key={dish.id}
              name={dish.name}
              desc={dish.description}
              price={dish.price}
            />
          ))}
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl ml-2 mb-3 font-medium">MENU</h1>
        {data.map((dish) => (
          <ProductCard
            key={dish.id}
            name={dish.name}
            desc={dish.description}
            price={dish.price}
          />
        ))}
      </div>
    </div>
  );
};

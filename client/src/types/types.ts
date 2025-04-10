export type Extras = {
  _id: string;
  name: string;
  price: number;
};

export type Bun = "Classic" | "Whole Grain" | "Gluten Free";
export type Doneness = "Rare" | "Medium Rare" | "Well Done";

export type Dish = {
  id: string;
  name: string;
  price: number;
  description: string;
  isLimited?: boolean;
};

export type CartItem = {
  dish: Dish;
  quantity: number;
  bun: Bun;
  doneness: Doneness;
  extras: Extras[];
};

export type Input = {
  title: string;
  name: string;
  placeholder: string;
  type?: string;
};

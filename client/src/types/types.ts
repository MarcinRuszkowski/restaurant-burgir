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

export type FormInput = {
  title: string;
  name: string;
  placeholder: string;
  type?: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export type FormField = "name" | "email" | "phone" | "password";

export type AlertStatus = "fail" | "pass";
export type Alert = {
  status: AlertStatus;
  message: string;
};

export type ExtraItem = {
  id: string;
};

export type OrderItem = {
  name: string;
  quantity: number;
  bun: "Classic" | "Whole Grain" | "Gluten Free";
  doneness: "Rare" | "Medium Rare" | "Well Done";
  extras: ExtraItem[];
};

export interface OrderData {
  number?: number;
  createdAt: string;
  deliveryAddress: string;
  totalPrice: number;
  items: {
    name: string;
    quantity: number;
    extras: string[];
  }[];
}

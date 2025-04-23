import React from "react";
import { OrderData } from "../types/types";

interface OrderHistoryListProps {
  orderData: OrderData[];
}

export const OrderHistoryList: React.FC<OrderHistoryListProps> = ({
  orderData,
}) => {
  return (
    <div className="p-4 space-y-6">
      {orderData.map((order, index) => (
        <div key={index} className="border p-4 rounded-xl shadow-sm bg-white">
          <p className="text-sm text-gray-500">Data: {order.createdAt}</p>
          <p className="text-sm text-gray-500">
            Adres dostawy: {order.deliveryAddress}
          </p>
          <div className="mt-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="border-b py-2">
                <div className="font-semibold">
                  {item.name} x {item.quantity}
                </div>
                {item.extras.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Dodatki: {item.extras.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 font-bold">Suma: {order.totalPrice} zł</p>
        </div>
      ))}
    </div>
  );
};

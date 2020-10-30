import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1 Create state to hold the order
  const [order, setOrder] = useState([]);

  // 2 Make a function to add things to the order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3 Make a function to remove things from the order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // TODO: 4 Send this data to a serverless function when they check out
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}

import calculatePizzaPrice from './calculatePizzaPrice.js';

export default function calculateOrderTotal(order, pizzas) {
  let totalPrice = 0;

  order.forEach((singleOrder) => {
    const pizza = pizzas.find((p) => p.id === singleOrder.id);
    totalPrice += calculatePizzaPrice(pizza.price, singleOrder.size);
  });

  return totalPrice;
}

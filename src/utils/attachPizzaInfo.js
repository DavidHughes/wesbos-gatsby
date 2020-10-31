import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function attachPizzaInfo(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((p) => p.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}

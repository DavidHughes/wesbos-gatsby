import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachPizzaInfo from './attachPizzaInfo';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1 Create state to hold the order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // Runs when someone submits form.
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const body = {
      order: attachPizzaInfo(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      organic: values.organic,
    };

    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    setLoading(false);
    // Check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setError(text.message);
    } else {
      // it worked!
      setMessage(`Come on down for your pizza${order.length > 1 ? 's' : ''}`);
    }
  }

  // TODO: 4 Send this data to a serverless function when they check out
  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}

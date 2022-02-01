import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create state to hold our order

  // We got rid of this line b/c we moved useState up to the provider
  // See gatsby-browser.js / gatsby-ssr.js / OrderContext.js
  // const [order, setOrder] = useState([]);

  // Now we access both our state and state updater function via context
  const [order, setOrder] = useContext(OrderContext);

  // 2. Make function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everythihng after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  //   TODO:
  // 4. Send this data to a serverless function when they check out

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}

import { Link } from 'gatsby';
import React from 'react';

function Pizza({ pizza }) {
  console.log(pizza);
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
          <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        </h2>
      </Link>
    </div>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <Pizza key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

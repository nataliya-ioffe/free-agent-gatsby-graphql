import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

export default function ToppingsFilter() {
  // Get a list of all the toppings
  // get a list of all the pizzas with their toppings

  function countPizzasInToppings(pizzas) {
    // return the pizzas with counts

    const counts = pizzas
      .map((pizza) => pizza.toppings)
      .flat()
      .reduce((acc, topping) => {
        // check if this is an existing topping
        const existingTopping = acc[topping.id];

        if (existingTopping) {
          console.log('Existing Topping', existingTopping.name);
          //  if it is, increment by 1
          existingTopping.count += 1;
        } else {
          console.log('New Topping', topping.name);
          // otherwise create a new entry in our acc and set it to one
          acc[topping.id] = {
            id: topping.id,
            name: topping.name,
            count: 1,
          };
        }

        return acc;
      }, {});

    const sortedToppings = Object.values(counts).sort(
      (a, b) => b.count - a.count
    );
    return sortedToppings;
  }

  const data = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(data.pizzas.nodes);

  console.clear();
  console.log(toppingsWithCounts);
  // loop over the list of toppings and
  // display topping count of pizzas in that topping

  return (
    <ToppingsStyles>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
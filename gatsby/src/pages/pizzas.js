import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/Toppings';

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

// Page query! Must export it.
export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        image {
          asset {
            # fixed(width: 200, height: 200) {
            #   ...GatsbySanityImageFixed
            # }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        toppings {
          id
          name
        }
      }
    }
  }
`;

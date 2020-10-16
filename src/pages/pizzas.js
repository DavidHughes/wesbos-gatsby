import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({
  data: {
    pizzas: { nodes },
  },
}) {
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={nodes} />
    </>
  );
}

export const query = graphql`
  query PizzasQuery {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

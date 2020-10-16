import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({
  data: {
    pizzas: { nodes: pizzas },
  },
  pageContext: topping,
}) {
  return (
    <>
      <ToppingsFilter activeTopping={topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query PizzasQuery($id: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { id: { eq: $id } } } }
    ) {
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

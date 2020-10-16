import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function ToppingPage({
  data: {
    pizzas: { nodes: pizzas },
  },
  pageContext: topping,
}) {
  console.log('pizzas', pizzas);
  console.log('topping', topping);
  return (
    <>
      <ToppingsFilter chosenTopping={topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query PizzaByToppingQuery($id: String!) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        id
        name
        price
        image {
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
        toppings {
          id
          name
        }
      }
    }
  }
`;

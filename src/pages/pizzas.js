import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({
  data: {
    pizzas: { nodes: pizzas },
  },
  pageContext: topping,
}) {
  return (
    <>
      <SEO
        title={topping.name ? `Pizzas with ${topping.name}` : 'All Pizzas'}
      />
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

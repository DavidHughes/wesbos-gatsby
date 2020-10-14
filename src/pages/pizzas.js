import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({
  data: {
    pizzas: { nodes },
  },
}) {
  console.log(nodes);
  return (
    <>
      <PizzaList pizzas={nodes} />
    </>
  );
}

export const query = graphql`
  query MyQuery {
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

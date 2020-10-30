import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  const isPizzaVegetarian = pizza.toppings.every(
    (topping) => topping.vegetarian
  );
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div>
          <h2 className="mark">
            {pizza.name}
            {isPizzaVegetarian && <i>🌱</i>}
          </h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>
                {topping.name}
                {!isPizzaVegetarian && topping.vegetarian && <i>🌱</i>}
              </li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

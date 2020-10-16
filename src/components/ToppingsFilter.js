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
    background: var(--grey, #666);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow, yellow);
    }
  }
`;

function countPizzasUsingTopping(pizzas) {
  // return pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // Check if this is an existing topping
      // if it is, increment it
      // otherwise, set the topping to 1
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = { id: topping.id, name: topping.name, count: 1 };
      }

      return acc;
    }, {});

  // sort based on count
  const sortedCounts = Object.values(counts).sort((a, b) => a.count - b.count);
  return sortedCounts;
}

export default function ToppingsFilter() {
  // Get a list of all toppings
  // Get all pizzas & their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          toppings {
            id
            name
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countPizzasUsingTopping(pizzas.nodes);
  // Count how many pizzas use each topping
  // Loop over the list of toppings and display the topping and list of pizzas using that topping
  return (
    <ToppingsStyles>
      {toppingsWithCounts.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

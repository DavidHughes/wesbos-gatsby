import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // Get a template for the page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // Loop each pizza and apply template to the pizza
  data.pizzas.nodes.forEach((pizza) => {
    console.log(`Creating a page for ${pizza.name}`);
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        pizza,
        slug: pizza.slug.current,
      },
    });
  });
}
export async function createPages(params) {
  // Create pages dynamically:
  // 1) Pizzas
  await turnPizzasIntoPages(params);
  // 2) Toppings
  // 3) Slicemasters
  console.log('createPages');
}

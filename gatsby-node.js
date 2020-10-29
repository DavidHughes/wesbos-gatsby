import path from 'path';
import fetch from 'isomorphic-fetch';

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

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // Query all toppings
  const {
    data: {
      toppings: { nodes: toppings },
    },
  } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  // Loop through all toppings and apply template to the topping.
  toppings.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        ...topping,
      },
    });
  });
}
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();

  // loop over each one
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      child: null,
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // turn each beer into a node
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // query slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // TODO: turn each slicemaster into their own page
  // Figure out how many pages there are based on how many slicemasters there are vs how many per page.
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log('Page base', pageBase);
  console.log('Page size', pageSize);
  console.log('pageCount:', pageCount);
  console.log('Slicemasters count:', data.slicemasters.totalCount);

  // Loop from 1 to N and create the listings pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating Slicemaster page #${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch a list of beers and source them into gatsby
  await Promise.all([
    fetchBeersAndTurnIntoNodes({
      actions,
      createNodeId,
      createContentDigest,
    }),
  ]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}

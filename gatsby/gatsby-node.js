// From Node
import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // Step 1: Define a template for this Pizza page
  const pizzaTemplate = path.resolve('./src/templates/PizzaTemplate.js');

  // Step 2: Query for the name and slugs of all pizzas
  // Syntax is a bit different here than other queries because we are using the Node API
  // await graphql(`...`) vs graphql`...`
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

  // Step 3: Loop over each pizza to create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // Choose the URL for the new page being created
      path: `pizza/${pizza.slug.current}`,
      // The component is the template that Gatsby should reference to create the page
      component: pizzaTemplate,
      // Context is passed directly to the newy created page and can be accessed via GraphQL query variable
      // See PizzaTemplate.js sanityPizza query for reference
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // Step 1: Define a template for the topping page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // Step 2: Query for all pizza toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  // Step 3: Create a page for each pizza topping
  data.toppings.nodes.forEach((topping) => {
    console.log('Creating a page for', topping.name);
    actions.createPage({
      // Choose the URL for the new page being created
      path: `topping/${topping.name}`,
      // The component is the template that Gatsby should reference to create the page
      component: toppingTemplate,
      // Context is passed directly to the newy created page and can be accessed via GraphQL query variable
      // See PizzaTemplate.js sanityPizza query for reference
      context: {
        topping: topping.name,
      },
    });
  });
}

// Source data from an external API (a sample beer API)
// 1. Fetch a list of beers
// 2. Create a node for each beer
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // use fetch import from Node
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();

  beers.forEach((beer) => {
    // // Create metadata for each beer node
    const nodeMetadata = {
      // createNodeId from gatsby -
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({
      ...beer,
      ...nodeMetadata,
    });
  });
}

export async function sourceNodes(params) {
  // Fetch a list of beers and source them into our Gatsby API by creating nodes
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create the below pages dynamically.
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
  ]);

  // 3. Slicemasters
}

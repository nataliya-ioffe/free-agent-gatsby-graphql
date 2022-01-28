// From Node
import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // Step 1: Get a template for this Pizza page
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
    console.log('creating a page for', pizza.name);
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
  // Step 1: Get a template for the Topping page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // Step 2: Query for the name and slugs of all pizzas
  // Syntax is a bit different here than other queries because we are using the Node API
  // await graphql(`...`) vs graphql`...`
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

  // Step 3: Loop over each pizza to create a page for that pizza
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

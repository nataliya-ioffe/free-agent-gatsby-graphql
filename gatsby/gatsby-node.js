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

export async function createPages(params) {
  // Create the below pages dynamically:
  // 1. Pizzas
  await turnPizzasIntoPages(params);

  // 2. Toppings
  // 3. Slicemasters
}

import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

// *************************** //
// *************************** //
// This template is used to create pages from each slicemaster queried for in AllSanityPerson via GraphQL
// The createPage functionality can be viewed in gatsby-node.js
// *************************** //
// *************************** //

export default function SingleslicemasterPage({ data }) {
  const { slicemaster } = data;

  console.log('test');

  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster.image.asset.src} />
      <div className="center">
        <Img fluid={slicemaster.image.asset.fluid} />
        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
}

// Query is dynamic based on the slug passed in through Context when page was created (see turnslicemastersIntoPages in gatsby-node.js)
// This query could also live in gatsby-node within the turnslicemastersIntoPages function. Pros/Cons:
// // Pro: Only need to query one time (in gatsby-node). Every page will use this query.
// // Con: Anytime you need to change the query, you need to kill the serve process and rerun npm start
// When querying directly in the template like this, Pros/Cons:
// // Pro: When you query in the template directly, query modifications are immediately hot reloaded, no need to restart
// // Con: Additional query.
export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

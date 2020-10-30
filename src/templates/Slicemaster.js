import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function SlicemasterPage({ data: { slicemaster } }) {
  console.log(slicemaster);
  return (
    <>
      <SEO title={slicemaster.name} />
      <div className="center">
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <h2 className="mark">{slicemaster.name}</h2>
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

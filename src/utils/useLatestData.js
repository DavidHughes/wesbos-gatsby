import { useEffect, useState } from 'react';

// All this and its usage below does is "fake"* to VSCode that it's a graphql query
// and kick in the syntax highlighting/linting.
// *not fake - real gql but without need for a library to process it.
const gql = String.raw;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [sliceMasters, setSliceMasters] = useState();

  useEffect(() => {
    const details = `_id
      name
      slug {
        current
      }
      image {
        asset {
          url
          metadata {
            lqip
          }
        }
      }`;

    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "slicemasterHQ") {
              name
              slicemasters {
                ${details}
                description
              }
              hotslices {
                ${details}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setHotSlices(res.data.StoreSettings.hotslices);
        setSliceMasters(res.data.StoreSettings.slicemasters);
      })
      .catch((err) => console.error('Fudge!', err));
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}

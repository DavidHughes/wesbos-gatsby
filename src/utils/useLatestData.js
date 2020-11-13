import { useEffect, useState } from 'react';

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [sliceMasters, setSliceMasters] = useState();

  useEffect(() => {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          StoreSettings(id: "slicemasterHQ") {
            name,
            slicemasters {
              name,
              slug {
                current
              },
              description
            },
            hotslices {
              name
            },
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // check for errors
        // set data to state
        console.log('Fetched data', res.data.StoreSettings);
        setHotSlices(res.data.StoreSettings.hotslices);
        console.log('Set hotSlices');
        setSliceMasters(res.data.StoreSettings.slicemasters);
        console.log('Set slicmasters');
      });
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}

import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <p>HotSlices</p>
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();
  console.log({ sliceMasters, hotSlices });
  return (
    <>
      <div className="center">
        <h1>The Best Pizzas in Town!</h1>
        <p>Open 11am til 11pm every day</p>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </>
  );
}

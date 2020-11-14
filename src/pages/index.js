import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Currently slicing</span>
      </h2>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is cookin' right now!</p>
      )}
      {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
    </div>
  );
}
function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Fresh from the oven</span>
      </h2>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && (
        <p>Nothing's in the house quite yet, order ahead!</p>
      )}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();

  return (
    <>
      <div className="center">
        <h1>The Best Pizzas in Town!</h1>
        <p>Open 11am til 11pm every day</p>
        <HomePageGrid>
          <CurrentlySlicing sliceMasters={sliceMasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}

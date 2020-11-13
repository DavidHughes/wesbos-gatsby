import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count || 4 }, () => (
        <ItemStyles>
          <p>
            <span className="mark">Loading!</span>
          </p>
          <img
            className="loading"
            alt="Loading"
            width="500"
            height="400"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkuAEAAN4A2mhjcMYAAAAASUVORK5CYII="
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}

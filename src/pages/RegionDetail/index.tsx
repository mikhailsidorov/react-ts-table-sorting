import { IRegion } from 'models';
import React from 'react';
import { useParams } from 'react-router-dom';

interface IRegionDetailProps {
  regions: IRegion[]
}

interface IRegionDetailParams {
  order: string;
}

export const RegionDetail:React.FC<IRegionDetailProps> = ({ regions }) => {
  const { order } = useParams<IRegionDetailParams>();

  const detailRegion = regions.find(region => {
    return region.order === Number(order);
  });

  let properties: JSX.Element[] | null = null;
  if (detailRegion) {
    properties = Object.keys(detailRegion).map((regionProperty: string) => (
      <li key={regionProperty}>{regionProperty}: {detailRegion[regionProperty]}</li>
    ))
  }

  return (
    <main>
      {detailRegion ? (
        <article>
          <h2>{detailRegion.fullName}</h2>
          {properties ? <ul>{properties}</ul> : null}
        </article>
        ) : null }
    </main>
  )
}

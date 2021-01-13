import React from 'react';
import { Link } from 'react-router-dom';
import { IRegion } from '../../models';

interface RegionListProps {
  regions: IRegion[];
}

export const RegionList:React.FC<RegionListProps> = ({ regions }) => {
  return (
  <main>
    <ul>
      {regions.map(region => (
        <li key={region.order}>
          <Link to={`/regions/${region.order}`}>{region.territory} - {region.libraries}</Link>
        </li>
      ))}
    </ul>
  </main>
  )
}

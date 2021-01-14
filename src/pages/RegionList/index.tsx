import React, { FC } from 'react';
import { IRegionListProps } from '../../models';
import { RegionsTable } from '../../components/RegionsTable';

export const RegionList: FC<IRegionListProps> = ({ regions }) => {
  return <RegionsTable regions={regions} />;
};

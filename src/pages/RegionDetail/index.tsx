import React, { Fragment } from 'react';
import { ColumnsType } from "antd/es/table";
import { IRegion } from 'models';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

interface IRegionDetailProps {
  regions: IRegion[]
}

interface IRegionDetailParams {
  order: string;
}

interface IProperty {
    [key: string]: string | number
}

export const RegionDetail:React.FC<IRegionDetailProps> = ({ regions }) => {
  const { order } = useParams<IRegionDetailParams>();

  const detailRegion = regions.find(region => {
    return region.order === Number(order);
  });

  let columns: ColumnsType<IProperty> = [
    {
      key: "name",
      title: "Свойство",
      dataIndex: "name"
    },
    {
      key: "value",
      title: "Значение",
      dataIndex: "value"
    }
  ]
  let dataSource: IProperty[] | null = null
  if (detailRegion) {
    dataSource = Object.keys(detailRegion).map(propertyName => {
      return {name: propertyName, value: detailRegion[propertyName]}
    })
  }

  return (
    <Fragment>
      {detailRegion && dataSource ?
        <Table title={() => <h2>{detailRegion.territory}</h2>}rowKey="name" pagination={false} columns={columns} dataSource={dataSource} />
      : null}
    </Fragment>
  )
}

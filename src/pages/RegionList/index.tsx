import React, { Fragment } from 'react';
import { Table } from 'antd';
import { ColumnsType } from "antd/es/table";
import { Link } from 'react-router-dom';
import { IRegion } from '../../models';

interface RegionListProps {
  regions: IRegion[];
}

export const RegionList:React.FC<RegionListProps> = ({ regions }) => {

  let columns: ColumnsType<IRegion> = [
    {
      key: "territory",
      title: "Регион",
      dataIndex: "territory",
      render: (text, region)  => <Link to={`/regions/${region.order}`}>{text}</Link>
    },
    {
      key: "libraries",
      title: "Библиотеки",
      dataIndex: "libraries",
    },
    {
      key: "fullName",
      title: "Организация",
      dataIndex: "fullName"
    },
    {
      key: "address",
      title: "Адрес",
      dataIndex: "address"
    }
  ]

  return (
    <Fragment>
        <Table rowKey="order" columns={columns} loading={regions.length < 1} dataSource={regions} pagination={false} />
    </Fragment>
  )
}

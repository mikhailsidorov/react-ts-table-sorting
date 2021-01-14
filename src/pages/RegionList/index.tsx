import React, {
  Fragment,
  useRef,
  useState,
  FC,
  JSXElementConstructor,
} from 'react';
import { Table, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IRegion } from '../../models';
import Highlighter from 'react-highlight-words';

interface RegionListProps {
  regions: IRegion[];
}

interface IFilterDropdownProps {
  setSelectedKeys: (selectedKeys: string[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
}

interface IColumnSearchRecord {
  [key: string]: string | number | boolean;
  dataIndex: string;
}

interface IColumsSearchProps {
  filterDropdown: FC<IFilterDropdownProps>;
  filterIcon: FC<{ filtered: boolean }>;
  onFilter: IOnFilter;
  onFilterDropdownVisibleChange: (visible: boolean) => void;
  render: (text: string, region: IRegion) => JSX.Element | string;
}

interface IGetColumnSearch {
  (dataIndex: string): IColumsSearchProps;
}

interface IOnFilter {
  (value: string | number | boolean, record: IRegion): boolean;
}

export const RegionList: FC<RegionListProps> = ({ regions }) => {
  const searchInputRef = useRef<Input>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');


  const getColumnSearchProps = (dataIndex: string): IColumsSearchProps => {
    const filterDropdown: FC<IFilterDropdownProps> = ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    );

    const filterIcon: FC<{ filtered: boolean }> = ({ filtered }) => {
      return <SearchOutlined style={{ 'color': filtered ? '#1890ff' : undefined }} />
    };

    const onFilter: IOnFilter= (value, record) => {
      return record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase()) : false
    };

    const onFilterDropdownVisibleChange = (visible: boolean):void => {
      if (visible) {
        setTimeout(() => searchInputRef.current?.select(), 100);
      }
    }

    const render: (text: string, region: IRegion) => JSX.Element | string = (text, region) =>
      searchedColumn === dataIndex ? (
        <Link to={`/regions/${region.order}`}>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        </Link>
      ) : (
        <Link to={`/regions/${region.order}`}>{text}</Link>
      );

    return {
      filterDropdown,
      filterIcon,
      onFilter,
      onFilterDropdownVisibleChange,
      render
    };
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  let columns: ColumnsType<IRegion> = [
    {
      key: 'territory',
      title: 'Регион',
      dataIndex: 'territory',
      ...getColumnSearchProps('territory'),
      // render: (text: string, region) => (
      //   <Link to={`/regions/${region.order}`}>{text}</Link>
      //   ),
    },
    {
      key: 'libraries',
      title: 'Библиотеки',
      dataIndex: 'libraries',
      sorter: (a, b) => a.libraries - b.libraries,
    },
    {
      key: 'fullName',
      title: 'Организация',
      dataIndex: 'fullName',
    },
    {
      key: 'address',
      title: 'Адрес',
      dataIndex: 'address',
    },
  ];

  return (
    <Fragment>
      <Table
        rowKey="order"
        columns={columns}
        loading={regions.length < 1}
        dataSource={regions}
        pagination={false}
      />
    </Fragment>
  );
};

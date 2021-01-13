import React, { useEffect, useState, FC } from 'react';
import { Layout } from 'antd';
import './app.css';
import { getData } from "./api";
import { ILibrary } from './models';

export const App:FC = () => {
  const [data, setData] = useState<ILibrary[]>([]);

  useEffect(() => {
    getData().then((newData) => {
      setData(newData);
    });
  }, []);

  return (
    <Layout>
      <pre>
        { JSON.stringify(data, null, 2) }
      </pre>
    </Layout>
  );
}

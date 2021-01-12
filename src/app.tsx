import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import './app.css';
import { getData } from "./api";

export default function App() {
  const [data, setData] = useState([]);

  const [regions, setRegions] = useState([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <Layout>
      <pre>
        { JSON.stringify(data, null, 2) }
      </pre>
    </Layout>
  );
}

import React, { useEffect, useState, FC } from 'react';
import { Switch, Route, Redirect, Link, useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { getData } from "./api";
import { IRegion } from './models';
import { RegionList, RegionDetail } from './pages';

import styles from './app.module.css';

const { Header, Content } = Layout;

export const App:FC = () => {
  const [data, setData] = useState<IRegion[]>([]);

  useEffect(() => {
    getData().then((newData) => {
      setData(newData);
    });
  }, []);

  return (
    <Layout>
      <Header>
        <Link to='/regions'>Regions</Link>
      </Header>
      <Content className={styles.content} >
        <Switch>
          <Route path="/regions/:order" component={()  => <RegionDetail regions={data} />} />
          <Route path="/regions" component={() => <RegionList regions={data} />} />
          <Redirect to="/regions" />
        </Switch>
      </Content>
    </Layout>
  );
}

import React, { useEffect, useState, FC } from 'react';
import { Switch, Route, Redirect, Link, useParams } from 'react-router-dom';
import { Layout } from 'antd';
import './app.css';
import { getData } from "./api";
import { IRegion } from './models';
import { RegionList, RegionDetail } from './pages';

export const App:FC = () => {
  const [data, setData] = useState<IRegion[]>([]);

  useEffect(() => {
    getData().then((newData) => {
      setData(newData);
    });
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/regions/:order" component={()  => <RegionDetail regions={data} />} />
        <Route path="/regions" component={() => <RegionList regions={data} />} />
        <Redirect to="/regions" />
      </Switch>
    </Layout>
  );
}

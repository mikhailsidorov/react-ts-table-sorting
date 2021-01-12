import {Application} from "express";

const proxy = require('http-proxy-middleware');
const { Application }  = require('@types/express');

module.exports = function(app:Application) {
  app.use(proxy('/opendata/', { target: 'https://data.gov.ru/sites/default/files', changeOrigin: true, secure: false }));
};

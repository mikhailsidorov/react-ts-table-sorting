import proxy from 'http-proxy-middleware';
import { Application } from 'express';

module.exports = function(app:Application) {
  app.use(proxy('/opendata/', { target: 'https://data.gov.ru/sites/default/files', changeOrigin: true, secure: false }));
};

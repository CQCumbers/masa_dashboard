import 'react-mosaic-component/react-mosaic-component.css';
import './scss/index.scss'; import 'bootstrap';
import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';

import Dashboard from './components/Dashboard';
import DashboardModel from './models/DashboardModel';


const store = new DashboardModel();

render(
  <div>
    <DevTools />
    <Dashboard dashboard={store} />
  </div>,
  document.getElementById('root')
);

// playing around in the console
window.store = store;

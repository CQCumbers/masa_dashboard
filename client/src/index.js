import 'react-mosaic-component/react-mosaic-component.css';
import './scss/index.scss'; import 'bootstrap';
import './images/favicon.ico'; import './images/apple-touch-icon.png';
import React from 'react';
import { render } from 'react-dom';
import { create } from 'mobx-persist';
import DevTools from 'mobx-react-devtools';
import Dashboard from './components/Dashboard';
import DashboardModel from './models/DashboardModel';


const hydrate = create();
const store = new DashboardModel();
hydrate('store', store).then(() => {
  render(
    <div>
      <Dashboard dashboard={store} />
    </div>,
    document.getElementById('root')
  );

  window.store = store;
});

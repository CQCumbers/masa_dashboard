import 'react-mosaic-component/react-mosaic-component.css';
import './scss/index.scss'; import 'bootstrap';
import React from 'react';
import { render } from 'react-dom';
import { create } from 'mobx-persist';
import DevTools from 'mobx-react-devtools';
import Dashboard from './components/Dashboard';
import DashboardModel from './models/DashboardModel';


const hydrate = create();
const store = new DashboardModel();
hydrate('store', store).then(() => {
  window.setInterval(store.telemetry.fakeData, 100);

  render(
    <div>
      <DevTools />
      <Dashboard dashboard={store} />
    </div>,
    document.getElementById('root')
  );

  // playing around in the console
  window.store = store;
});

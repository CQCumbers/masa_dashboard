import { observable, computed, action } from 'mobx';
import { persist } from 'mobx-persist';
import { getLeaves } from 'react-mosaic-component';
import PanelModel from './PanelModel';
import TelemetryModel from './TelemetryModel';


class DashboardModel {
  telemetry = new TelemetryModel();
  @persist('list', PanelModel) @observable panels = [new PanelModel('New Panel')];
  @persist('object') @observable mosaicState = this.panels[0].id;

  @action
  changeMosaic = (newMosaicState) => {
    this.panels = this.panels.filter(
      panel => getLeaves(newMosaicState).includes(panel.id)
    );
    this.mosaicState = newMosaicState;
  };

  @action
  createNode = () => {
    this.panels.push(new PanelModel('New Panel'));
    return this.panels[this.panels.length - 1].id;
  };
}

export default DashboardModel;

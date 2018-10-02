import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import PanelModel from './PanelModel';
import TelemetryModel from './TelemetryModel';


class DashboardModel {
  telemetry = new TelemetryModel();
  @persist('object') @observable mosaicState = 0;
  @persist('list', PanelModel) @observable panels = [new PanelModel('Panel 0')];
  @persist @observable numPanels = 1;

  @action
  changeMosaic = (newMosaicState) => {
    this.mosaicState = newMosaicState;
  };

  @action
  createNode = () => {
    this.panels.push(new PanelModel(`Panel ${this.numPanels}`));
    return this.numPanels++;
  };
}

export default DashboardModel;

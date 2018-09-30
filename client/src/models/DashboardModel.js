import { observable, action } from 'mobx';
import PanelModel from './PanelModel';
import TelemetryModel from './TelemetryModel';


class DashboardModel {
  @observable mosaicState = 0;
  @observable panels = [];
  @observable numPanels = 0;

  constructor(panels, telemetry) {
    this.telemetry = telemetry || new TelemetryModel()//'http://127.0.0.1:5000');
    this.panels = panels || [new PanelModel('Panel 0', this.telemetry)];
    window.setInterval(this.telemetry.fakeData, 100);
    this.numPanels = this.panels.length;
  }

  @action
  changeMosaic = (newMosaicState) => {
    this.mosaicState = newMosaicState;
  };

  @action
  createNode = () => {
    this.panels.push(new PanelModel(`Panel ${this.numPanels}`, this.telemetry));
    return this.numPanels++;
  };
}


export default DashboardModel;

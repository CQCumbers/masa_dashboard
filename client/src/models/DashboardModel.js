import { observable, action } from 'mobx';
import PanelModel from './PanelModel';
import TelemetryModel from './TelemetryModel';
import * as workerTimers from 'worker-timers';


class DashboardModel {
  @observable mosaicState = 0;
  @observable panels = [];
  @observable numPanels = 0;

  constructor(panels, telemetry) {
    this.telemetry = telemetry || new TelemetryModel();
    this.panels = panels || [new PanelModel('Panel 0', this.telemetry)];
    this.numPanels = this.panels.length;
    workerTimers.setInterval(this.telemetry.fakeData, 100);
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

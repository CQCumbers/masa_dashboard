import { observable, action } from 'mobx';
import io from 'socket.io-client';
import SensorModel from './SensorModel';
import { graphTypes } from '../components/Graph';


class TelemetryModel {
  @observable isLoading = true;
  sensors = [];
  graphTypes = Object.keys(graphTypes);

  constructor() {
    fetch('/sensors').then(res => res.json()).then(json => {
      this.sensors = json.map(sensor => new SensorModel(sensor));
      this.socket = io.connect();
      this.socket.on('update', data => { this.addData(data); });
      this.isLoading = false;
    });
  }

  @action
  addData = (data) => {
    this.sensors.map((sensor, index) => {
      sensor.addData(data[0], data[index + 1]);
    });
  }

  @action
  fakeData = () => {
    this.sensors.map(sensor => {
      sensor.addData(new Date(), Math.random())
    });
  }
}


export default TelemetryModel

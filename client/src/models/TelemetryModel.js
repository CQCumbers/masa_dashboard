import { action } from 'mobx';
//import io from 'socket.io-client';
import SensorModel from './SensorModel';
import { graphTypes } from '../components/Graph';


class TelemetryModel {
  sensors = [];
  graphTypes = Object.keys(graphTypes);

  //constructor(url) {
  //  fetch(url + '/sensors').then(res => res.json()).then(json => {
  //    this.sensors = json.map(sensor => new SensorModel(sensor));
  //  });
  //  this.socket = io.connect(url);
  //  this.socket.on('update', data => { this.addData(data); });
  //}

  constructor() {
    this.sensors = [new SensorModel({
      name: 'Pressure0', units: 'psi',
      min: 0, max: 1, warnLow: 0.1, warnHigh: 0.9
    })];
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

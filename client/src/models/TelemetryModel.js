import { action } from 'mobx';
import SensorModel from './SensorModel';
import { graphTypes } from '../components/Graph';


class TelemetryModel {
  sensors = [
    new SensorModel('Pressure0', 'psi', (0.1, 0.9)),
    new SensorModel('Pressure1', 'psi', (0.1, 0.9)),
    new SensorModel('Pressure2', 'psi', (0.1, 0.9)),
    new SensorModel('Pressure3', 'psi', (0.1, 0.9)),
  ];

  graphTypes = Object.keys(graphTypes);

  @action
  fakeData = () => {
    this.sensors.map(sensor => {
      sensor.addData(new Date(), Math.random());
    });
  }
}


export default TelemetryModel

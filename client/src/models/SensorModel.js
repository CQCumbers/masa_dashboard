import { observable, computed, action } from 'mobx';

export default class SensorModel {
  @observable.shallow data = [];

  constructor(name, units, warningRange) {
    this.name = name;
    this.units = units;
    this.warningRange = warningRange;
  }

  @action
  addData(timestamp, value) {
    this.data.push({t: timestamp, y: value * 100});
    if (this.data.length >= 50) { this.data.shift(); }
  }

  @computed
  get lastData() {
    return this.data[this.data.length - 1];
  }

  @computed
  get warningState() {
    return range[0] < this.lastData, this.lastData < range[1];
  }
}

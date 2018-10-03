import { observable, computed, action } from 'mobx';

export default class SensorModel {
  @observable.shallow data = [{t: new Date(), y: 0}];

  constructor({ name, units, min, max, warnLow, warnHigh }) {
    this.name = name;
    this.units = units;
    this.range = [min, max];
    this.warnRange = [warnLow, warnHigh];
  }

  @action
  addData(timestamp, value) {
    this.data.push({t: timestamp, y: value * 100});
    if (this.data.length >= 50) { this.data.shift(); }
  }

  @computed
  get lastData() {
    return this.data[this.data.length - 1].y;
  }

  @computed
  get lastDataPercent() {
    return 100 * (this.data[this.data.length - 1].y - this.range[0]) / (this.range[1] - this.range[0]);
  }

  @computed
  get warningState() {
    return range[0] < this.lastData, this.lastData < range[1];
  }
}

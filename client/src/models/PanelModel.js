import { observable, computed, action } from 'mobx';
import { arrayMove } from 'react-sortable-hoc';


class PanelModel {
  @observable.shallow graphs = [];
  @observable title = '';
  @observable editMode = false;
  @observable newGraphType = 0;
  @observable newSensorType = 0;

  constructor(title, telemetry, graphs) {
    this.title = title;
    this.telemetry = telemetry;
    this.graphs = graphs || [];
  }

  @computed
  get graphTypes() {
    return this.telemetry.graphTypes;
  }

  @computed
  get sensorTypes() {
    return this.telemetry.sensors;
  }

  @action
  addGraph = () => {
    this.graphs.push({
      id: Math.random(),
      graphType: this.graphTypes[this.newGraphType],
      sensorType: this.sensorTypes[this.newSensorType]
    });
  };

  @action
  removeGraph = id => {
    this.graphs.remove(this.graphs.find(graph => (graph.id == id)));
  };

  @action
  sortGraphs = ({ oldIndex, newIndex }) => {
    this.graphs = arrayMove(this.graphs, oldIndex, newIndex);
  };

  @action
  changeTitle = (newTitle) => {
    this.title = newTitle;
  };

  @action
  changeMode = () => {
    this.editMode = !this.editMode;
  };

  @action
  changeSensor = (e) => {
    this.newSensorType = e.target.value;
  };

  @action
  changeGraph = (e) => {
    this.newGraphType = e.target.value;
  };
}


export default PanelModel;

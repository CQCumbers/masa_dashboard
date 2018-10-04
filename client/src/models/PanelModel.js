import { observable, computed, action } from 'mobx';
import { persist } from 'mobx-persist';
import { arrayMove } from 'react-sortable-hoc';


class PanelModel {
  @persist id = Math.random();
  @persist @observable title;
  @persist('list') @observable graphs = [];
  @observable editMode = false;
  @observable newGraphType = 0;
  @observable newSensorType = 0;

  constructor(title) {
    this.title = title;
    this.addGraph();
  }

  @action
  addGraph = () => {
    this.graphs.push({
      id: Math.random(),
      graphType: this.newGraphType,
      sensorType: this.newSensorType
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

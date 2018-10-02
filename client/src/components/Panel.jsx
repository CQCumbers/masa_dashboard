import React from 'react';
import { observer } from 'mobx-react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Graph from './Graph';


export const EditButton = ({ panel }) => (
  <button
    title='Edit'
    onClick={panel.changeMode}
    className='mosaic-default-control pt-button pt-minimal'
  >Edit</button>
);


const GraphContainer = observer(({ telemetry, panel }) => (
  <div className='card-body'>
    {panel.graphs.map(graph => (
      <Graph
        type={telemetry.graphTypes[graph.graphType]}
        sensor={telemetry.sensors[graph.sensorType]}
        key={`graph-${graph.id}`}
      />
    ))}
  </div>
));


const GraphList = SortableContainer(observer(({ telemetry, panel }) => (
  <div className='card-body'>
    {panel.graphs.map((graph, index) => (
      <GraphListElement
        telemetry={telemetry}
        graph={graph}
        onRemove={panel.removeGraph}
        key={`graphList-${graph.id}`}
        index={index}
      />
    ))}
  </div>
)));


const GraphListElement = SortableElement(({ telemetry, graph, onRemove }) => (
  <div className='p-3 border border-light bg-dark'>
    <button className='close' onClick={() => onRemove(graph.id)}><span>&times;</span></button>
    <strong>{telemetry.sensors[graph.sensorType].name}</strong>
    {telemetry.graphTypes[graph.graphType]}
  </div>
));


const GraphInput = observer(({ telemetry, panel }) => (
  <div className='card-footer border-top border-primary p-0'>
    <div className='input-group'>
      <select
        className='custom-select'
        value={panel.newSensorType}
        onChange={panel.changeSensor}
      >
        {telemetry.sensors.map((sensor, index) => (
          <option value={index} key={index}>{sensor.name}</option>
        ))}
      </select>
      <select
        className='custom-select'
        value={panel.newGraphType}
        onChange={panel.changeGraph}
      >
        {telemetry.graphTypes.map((graph, index) => (
          <option value={index} key={index}>{graph}</option>
        ))}
      </select>
      <div className='input-group-append'>
        <button className='btn btn-light' onClick={panel.addGraph}>ADD GRAPH</button>
      </div>
    </div>
  </div>
));


const Panel = observer(({ telemetry, panel }) => {
  if (panel.editMode) {
    return (
      <div className='card border-0 h-100'>
        <GraphList
          telemetry={telemetry}
          panel={panel}
          onSortEnd={panel.sortGraphs}
          onRemove={panel.removeGraph}
          lockAxis='y' distance={5}
          helperClass='sortableHelper'
        />
        <GraphInput telemetry={telemetry} panel={panel} />
      </div>
    );
  } 
  return (
    <div className='card border-0 h-100'>
      <GraphContainer telemetry={telemetry} panel={panel} />
    </div>
  );
});


export default Panel;

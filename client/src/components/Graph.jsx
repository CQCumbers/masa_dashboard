import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Line, HorizontalBar, Doughnut } from 'react-chartjs-2';


const LineGraph = observer(({ sensor }) => (
  <Line
    data={{
      datasets: [{
        label: sensor.name,
        data: sensor.data.slice(),
        backgroundColor: '#3C4856',
        borderColor: '#C3EAFF',
        pointRadius: 0,
      }]
    }}
    options={{
      scales: {xAxes:[{ type: 'time'}]},
      animation: {duration: 150}
    }}
  />
));

const BarGraph = observer(({ sensor }) => (
  <HorizontalBar
    data={{
      datasets: [{
        label: sensor.name,
        data: [sensor.lastData.y],
        backgroundColor: '#C3EAFF',
      }]
    }}
    options={{
      animation: {duration: 150}
    }}
  />
));

const Dial = observer(({ sensor }) => (
  <Doughnut
    data={{
      datasets: [{
        label: sensor.name,
        data: [sensor.lastData.y, 100 - sensor.lastData.y],
        backgroundColor: ['#C3EAFF', '#3C4856']
      }]
    }}
    options={{
      animation: {duration: 150}
    }}
  />
));

export const graphTypes = { LineGraph, BarGraph, Dial };

const Graph = (props) => {
  const SpecificGraph = graphTypes[props.type];
  return <SpecificGraph {...props} />;
}

export default Graph;

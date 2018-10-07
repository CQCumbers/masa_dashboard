import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { defaults, Chart, Line, HorizontalBar, Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-annotation'; import 'chartjs-plugin-doughnutlabel';
import colors from '../scss/index.scss';

defaults.global.defaultFontFamily = 'IBM Plex Mono';
defaults.global.defaultFontStyle = 300;
defaults.global.defaultFontSize = 11;

const LineGraph = observer(({ sensor }) => (
  <div className='p-1'>
    <h6 className='ml-2 small text-uppercase'><b>
      {sensor.name} ({sensor.lastData.toFixed(2)} {sensor.units})
    </b></h6>
    <Line
      height={80}
      data={{
        datasets: [{
          data: sensor.data.toJS(),
          lineTension: 0,
          backgroundColor: colors.light,
          borderColor: colors.primary,
          borderWidth: 1,
          pointRadius: 0,
        }]
      }}
      options={{
        scales: {
          xAxes:[{
            type: 'time',
            ticks: {autoSkip: false, maxRotation: 0, fontColor: colors.primary},
            time: {displayFormats: {second: 'hh:mm:ss'}, minUnit: 'second'},
          }],
          yAxes:[{
            id: 'value',
            ticks: {
              min: sensor.range[0], max: sensor.range[1],
              maxTicksLimit: 5, maxRotation: 0,
              fontColor: colors.primary
            },
            gridLines: {color: colors.light}
          }]
        },
        annotation: {annotations: [
          {
            type: 'line', mode: 'horizontal', scaleID: 'value',
            value: sensor.warnRange[0], borderColor: colors.danger, borderWidth: 1
          }, {
            type: 'line', mode: 'horizontal', scaleID: 'value',
            value: sensor.warnRange[1], borderColor: colors.danger, borderWidth: 1
          }
        ]},
        animation: {duration: 0},
        legend: {display: false},
        tooltips: {enabled: false},
        hover: {mode: null}
      }}
    />
  </div>
));

const BarGraph = observer(({ sensor }) => (
  <div className='p-1'>
    <h6 className='ml-2 small text-uppercase'><b>
      {sensor.name} ({sensor.lastData.toFixed(2)} {sensor.units})
    </b></h6>
    <HorizontalBar
      height={40}
      data={{
        datasets: [
          {label: 'data', data: [sensor.lastData], backgroundColor: colors.primary},
          {label: 'filler', data: [sensor.range[1] - sensor.lastData], backgroundColor: colors.light},
        ]
      }}
      options={{
        scales: {xAxes:[{
          id: 'value', stacked: true,
          ticks: {
            min: sensor.range[0], max: sensor.range[1], maxTicksLimit: 5,
            autoSkip: false, maxRotation: 0, fontColor: colors.primary
          }
        }], yAxes: [{stacked: true}]},
        annotation: {annotations: [
          {
            type: 'line', mode: 'vertical', scaleID: 'value',
            value: sensor.warnRange[0], borderColor: colors.danger, borderWidth: 1
          }, {
            type: 'line', mode: 'vertical', scaleID: 'value',
            value: sensor.warnRange[1], borderColor: colors.danger, borderWidth: 1
          }
        ]},
        animation: {duration: 0},
        legend: {display: false},
        tooltips: {enabled: false},
        hover: {mode: null}
      }}
    />
  </div>
));

const Dial = observer(({ sensor }) => (
  <div className='p-1 w-25 d-inline-block'>
    <h6 className='ml-2 small text-uppercase'><b>
      {sensor.name} ({sensor.units})
    </b></h6>
    <Doughnut
      height={80} width={80}
      data={{
        datasets: [{
          label: sensor.name,
          data: [sensor.lastDataPercent, 100 - sensor.lastDataPercent],
          backgroundColor: ['#C3EAFF', '#3C4856'],
          borderWidth: 1
        }]
      }}
      options={{
        plugins: {doughnutlabel: {labels: [
          {text: sensor.lastDataPercent.toFixed(0) + '%', color: colors.primary, font: {size: '16'}}
        ]}},
        cutoutPercentage: 60,
        animation: {duration: 0},
        tooltips: {enabled: false},
        hover: {mode: null}
      }}
    />
  </div>
));

export const graphTypes = { LineGraph, BarGraph, Dial };

const Graph = (props) => {
  const SpecificGraph = graphTypes[props.type];
  return <SpecificGraph {...props} />;
}

export default Graph;

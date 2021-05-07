import React, {Component} from 'react';
import {processColor} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

export default class Chart extends Component {
  render() {
    const data = {
      dataSets: [
        {
          values: this.props.tabStep
            ? this.props.tabStep.map((item) => item.value)
            : [],
          label: 'Number of steps',
          config: {
            color: processColor('#33A6D7'),
          },
        },
      ],
      config: {
        barWidth: 0.8,
      },
    };

    const yAxis = {
      left: {enabled: false},
      right: {
        enabled: true,
        drawAxisLine: true,
        axisLineWidth: 2,
        axisLineColor: processColor('black'),
        textSize: 15,
        spaceBottom: 10,
        valueFormatter: ' ',
      },
    };

    const xAxis = {
      position: 'BOTTOM',
      valueFormatter: this.props.formatter,
      drawGridLines: false,
      drawAxisLine: true,
      axisLineWidth: 2,
      axisLineColor: processColor('black'),
      textSize: 15,
      granularityEnabled: true,
      granularity: this.props.granularity,
    };

    return (
      <BarChart
        style={{
          flex: 1,
          marginTop: 10,
          marginBottom: 10,
          marginRight: 10,
        }}
        data={data}
        yAxis={yAxis}
        xAxis={xAxis}
        chartDescription={{text: ''}}
        legend={{enabled: false}}
        visibleRange={{x: {min: this.props.formatter.length}}}
        touchEnabled={false}
      />
    );
  }
}

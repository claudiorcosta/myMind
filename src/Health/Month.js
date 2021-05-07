import React, {Component} from 'react';
import {View} from 'react-native';
import {getSteps, getCals, getDists} from '../api/api';
import MonthDataTab from '../Components/MonthDataTab';
import Chart from '../Components/Chart';

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
    };
  }

  componentDidMount() {
    let start = new Date();
    let end = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    const options = {
      startDate: start,
      endDate: end,
    };
    getSteps(options, null, (res) => {
      this.setState({steps: res});
    });
  }
  render() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let tabStep = this.state.steps.map((x) => x.value);
    let stepSum = 0;
    let StepAvg = 0;
    if (tabStep.length > 0) {
      stepSum = tabStep.reduce(reducer);
      StepAvg = stepSum / tabStep.length;
    }

    let data = {
      numBox1: StepAvg,
      textBox1: 'Avg Monthly',
      numBox2: stepSum,
      textBox2: 'This Month',
    };

    var formatter = [];
    for (var i = 1; i <= 31; i++) {
      formatter.push(i.toString());
    }

    return (
      <View style={{flex: 1, backgroundColor: '#D6F0FF'}}>
        <Chart
          tabStep={this.state.steps}
          formatter={formatter}
          granularity={5}
        />
        <MonthDataTab data={data} />
      </View>
    );
  }
}

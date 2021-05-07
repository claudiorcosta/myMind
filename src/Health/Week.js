import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {getSteps, getCals, getDists} from '../api/api';
import WeekDataTab from '../Components/WeekDataTab';
import Chart from '../Components/Chart';

export default class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
    };
  }

  componentDidMount() {
    let start = new Date();
    let end = new Date();
    let nbDays = start.getDay();
    if (nbDays == 0) nbDays = 7;
    start.setDate(start.getDate() - (nbDays - 1));
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

    let boxData = {
      numBox1: StepAvg,
      textBox1: 'Avg Weekly',
      numBox2: stepSum,
      textBox2: 'This Week',
    };

    let formatter = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <View style={{flex: 1, backgroundColor: '#D6F0FF'}}>
        <Chart
          tabStep={this.state.steps}
          formatter={formatter}
          granularity={1}
        />
        <WeekDataTab data={boxData} />
      </View>
    );
  }
}

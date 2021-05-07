import React, {Component} from 'react';
import {View, Dimensions, Alert, Text} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

import {ScrollView} from 'react-native-gesture-handler';
import {getSteps, getCals, getDists} from '../api/api';
import DayDataTab from '../Components/DayDataTab';
import * as Progress from 'react-native-progress';
import RNPickerSelect from 'react-native-picker-select';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 0,
      goal: 10000,
      user: null,
      points: 0,
      feeling: '',
      feelingScore: 0,
    };
    this.tab = [];
  }

  selectFeeling = (feeling) => {
    this.setState({feeling: feeling});
    if (
      feeling == 'Happy' ||
      feeling == 'Proud' ||
      feeling == 'Optimistic' ||
      feeling == 'Excited' ||
      feeling == 'Thankful' ||
      feeling == 'Motivated' ||
      feeling == 'Positive' ||
      feeling == 'Encouraged'
    ) {
      this.state.feelingScore = 20;
    } else {
      if (
        feeling == 'Lonely' ||
        feeling == 'Insecure' ||
        feeling == 'Afraid' ||
        feeling == 'Angry' ||
        feeling == 'Sad' ||
        feeling == 'Depressed'
      ) {
        this.state.feelingScore = 5;
      }
    }
  };

  componentDidMount() {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    GoogleFit.authorize(options)
      .then(() => this._getData())
      .catch((err) => console.log(err));

    GoogleFit.isAvailable((err, res) => {
      if (err || !res) {
        Alert.alert(
          'Download Google Fit',
          'No data available for this account, please download Google Fit',
          [{text: 'OK', style: 'Cancel'}],
        );
      }
    });
  }

  async _getData() {
    let start = new Date();
    let end = new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    const options = {
      startDate: start,
      endDate: end,
    };
    getSteps(options, null, (res) => {
      this.setState({steps: res.length > 0 ? res[0].value : 0});
    });
    for (let i = 0; i < 24; i++) {
      start.setHours(i, 0, 0, 0);
      end.setHours(i, 59, 59, 999);
      var optionsTab = {
        startDate: start,
        endDate: end,
      };
      getSteps(optionsTab, i, (res, index) => {
        this.tab[index] = res.length > 0 ? res[0] : {date: '', value: 0};
        if (index == 23) {
          this.forceUpdate();
        }
      });
    }
  }

  render() {
    var progress =
      this.state.steps > this.state.goal
        ? 100
        : Math.round((this.state.steps * 100) / this.state.goal);

    var BoxData = {
      numBox1: this.state.steps,
      textBox1: 'Steps Today',
      numBox2: this.state.goal,
      textBox2: 'Daily Goal',
      numBox5: this.state.points + progress + this.state.feelingScore,
      textBox5: 'Points',
    };
    if (progress == 0) {
      this.state.points = 0;
    } else {
      if (progress >= 1 && progress <= 24) {
        this.state.points = 5;
      } else {
        if (progress >= 25 && progress <= 49) {
          this.state.points = 10;
        } else {
          if (progress >= 50 && progress <= 74) {
            this.state.points = 15;
          } else {
            if (progress >= 75 && progress <= 99) {
              this.state.points = 20;
            } else {
              if (progress == 100) {
                this.state.points = 30;
              }
            }
          }
        }
      }
    }

    var formatter = [];
    for (var i = 0; i < 24; i++) {
      formatter.push(i.toString());
    }

    return (
      <ScrollView style={{flex: 1, backgroundColor: '#D6F0FF'}}>
        <View
          style={{alignItems: 'center', margin: 5, backgroundColor: '#D6F0FF'}}>
          <Progress.Circle
            size={screenWidth / 1.5}
            progress={progress / 100}
            color="#33A6D7"
            thickness={10}
            showsText={true}
          />
        </View>
        <View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#33A6D7',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              How are you feeling: {this.state.feeling}
            </Text>
            <RNPickerSelect
              onValueChange={this.selectFeeling}
              style={{color: 'black'}}
              placeholder={{
                label: 'How are you feeling?',
                color: 'black',
              }}
              items={[
                {label: 'Happy', value: 'Happy'},
                {label: 'Proud', value: 'Proud'},
                {label: 'Optimistic', value: 'Optimistic'},
                {label: 'Excited', value: 'Excited'},
                {label: 'Thankful', value: 'Thankful'},
                {label: 'Motivated', value: 'Motivated'},
                {label: 'Positive', value: 'Positive'},
                {label: 'Encouraged', value: 'Encouraged'},
                {label: 'Lonely', value: 'Lonely'},
                {label: 'Insecure', value: 'Insecure'},
                {label: 'Afraid', value: 'Afraid'},
                {label: 'Angry', value: 'Angry'},
                {label: 'Sad', value: 'Sad'},
                {label: 'Depressed', value: 'Depressed'},
              ]}
              value={this.state.feeling}
            />
          </View>
          <DayDataTab data={BoxData} />
        </View>
      </ScrollView>
    );
  }
}

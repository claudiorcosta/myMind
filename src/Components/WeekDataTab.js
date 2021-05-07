import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {color} from 'react-native-reanimated';

const WeekDataTab = (props) => {
  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {props.data.textBox1}:{' '}
          {numberWithCommas(Math.round(props.data.numBox1))}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          {props.data.textBox2}:{' '}
          {numberWithCommas(Math.round(props.data.numBox2))}
        </Text>
      </View>
    </View>
  );
};

export default WeekDataTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderWidth: 0.5,
    borderColor: '#33A6D7',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

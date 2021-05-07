import React, {useState, useContext} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {color} from 'react-native-reanimated';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const DayDataTab = (props) => {
  const [feeling, setFeeling] = useState(false);
  const [finalScore, setFinalScore] = useState('');
  const {user, logout} = useContext(AuthContext);

  const numberWithCommas = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#D6F0FF'}}>
      <View style={{flex: 1, flexDirection: 'row'}}></View>
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

      <View style={styles.container} style={{flexDirection: 'row'}}>
        <Text style={styles.text}>
          {props.data.textBox5}: {props.data.numBox5}
        </Text>
      </View>

      <View>
        <Text style={{color: 'black'}}>150: Congratulations!</Text>
        <Text style={{color: 'black'}}>100-149: Going well</Text>
        <Text style={{color: 'black'}}>50-99: Getting there</Text>
        <Text style={{color: 'black'}}>0-49: You can do it</Text>
      </View>
    </View>
  );
};

export default DayDataTab;
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

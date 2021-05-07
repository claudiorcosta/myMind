import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Profile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const calculate_age = (date) => {
    var today = new Date();
    var birthDate = new Date(date);
    console.log('get bod-->', birthDate);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log('my age', age_now);
    return age_now;
  };

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      calculate_age(moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')) <= 17;
    }
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        displayName: userData.displayName,
        dateOfBirth: userData.dateOfBirth,
        age: calculate_age(date),
        about: userData.about,
        dateOfBirth: formatDate(date),
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  useEffect(() => {
    getUser();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <Image
          style={styles.userImg}
          source={{
            uri:
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <View>
          <Text style={{color: 'blue', fontSize: 18, paddingTop: 10}}>
            Change profile photo
          </Text>
        </View>

        <View style={{paddingTop: 10}}>
          <View style={styles.action}>
            <Icon name="user-o" color="#black" size={20} />
            <TextInput
              placeholder="Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.displayName : ''}
              onChangeText={(txt) =>
                setUserData({...userData, displayName: txt})
              }
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <Icon name="at" color="#black" size={20} />
            <Text
              placeholder="Email"
              placeholderTextColor="#666666"
              style={styles.textInput}>
              {userData ? userData.email || 'Test' : 'Test'}
            </Text>
          </View>
          <View style={styles.action}>
            <Icon name="address-card" color="#black" size={20} />
            <TextInput
              multiline
              numberOfLines={3}
              placeholder="About Me"
              placeholderTextColor="#666666"
              value={userData ? userData.about : ''}
              onChangeText={(txt) => setUserData({...userData, about: txt})}
              autoCorrect={true}
              style={[styles.textInput, {height: 40}]}
            />
          </View>
          <View style={styles.action}>
            <Icon name="calendar" color="#black" size={20} />

            <TouchableOpacity onPress={showDatePicker}>
              <Text>{userData ? userData.dateOfBirth : formatDate(date)}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                display="default"
                mode={mode}
                onChange={onChange}
              />
            )}
          </View>
          <Button title="Save" onPress={handleUpdate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    paddingTop: 300,
    paddingBottom: 300,
    paddingLeft: 100,
    paddingRight: 100,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  button: {
    paddingBottom: 300,
  },
});

export default Profile;

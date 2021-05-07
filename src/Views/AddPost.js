import React, {useState, useContext} from 'react';
import {
  Switch,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import RNPickerSelect from 'react-native-picker-select';
import {State} from 'react-native-gesture-handler';

const AddPost = () => {
  const {user, logout} = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [switchValue, setSwitchValue] = useState(false);
  const [feeling, setFeeling] = useState(false);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };

  const toggleFeeling = (value) => {
    setFeeling(value);
  };

  const submitPost = async () => {
    if (post == null || feeling == 'How are you feeling?') {
      Alert.alert('Post cannot be empty');
    } else {
      var newDocRef = firestore().collection('posts').doc();
      console.log('Post: ', post);

      newDocRef
        .set({
          postId: newDocRef.id,
          userId: user.uid,
          post: post,
          postTime: firestore.Timestamp.fromDate(new Date()),
          userEmail: user.email,
          triggerWarning: switchValue ? 'Trigger Warning' : '',
          feeling: feeling,
        })
        .then(() => {
          console.log('Post Added!');
          Alert.alert(
            'Post published!',
            'Your post has been published Successfully!',
          );
          setPost(null);
        })
        .catch((error) => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What's on your mind?"
        multiline
        numberOfLines={4}
        value={post}
        onChangeText={(content) => setPost(content)}
      />
      <Text style={{marginTop: 5}}>
        Trigger Warning: {switchValue ? 'On' : 'Off'}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Switch
          style={{marginTop: 30}}
          onValueChange={toggleSwitch}
          value={switchValue}
        />
      </View>

      <View>
        <Text style={{marginTop: 5}}>How are you feeling: {feeling}</Text>
        <RNPickerSelect
          onValueChange={toggleFeeling}
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
          value={feeling}
        />
      </View>

      <Button title="Post!" onPress={submitPost} />
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6F0FF',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

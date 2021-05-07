import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {List, Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth, {firebase} from '@react-native-firebase/auth';

import {createStackNavigator} from '@react-navigation/stack';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

const BuddyChat = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const currentUser = user.toJSON();

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const fetchUsers = async () => {
    try {
      const list = [];

      await firestore()
        .collection('users')
        .where('displayName', '!=', user.displayName)
        .orderBy('displayName')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {uniqueId, displayName, email, userImg} = doc.data();
            list.push({
              id: doc.id,
              uniqueId,
              displayName,
              email,
              userImg,
            });
          });
        });

      setUsers(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#D6F0FF'}}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 60, height: 60, borderRadius: 50}} />
            <View style={{marginLeft: 20}}>
              <View style={{width: 120, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.uniqueID}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  displayName: item.displayName,
                  uniqueID: item.uniqueID,
                })
              }>
              <List.Item title={item.displayName} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    paddingTop: 300,
    paddingBottom: 300,
    paddingLeft: 100,
    paddingRight: 100,
  },
});

export default BuddyChat;

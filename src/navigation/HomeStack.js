import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';

import UserMain from '../Views/UserMain';
import BuddyChat from '../Views/BuddyChat';

import ProfileMenu from '../Views/ProfileMenu';
import AddPost from '../Views/AddPost';
import EditProfile from '../Views/EditProfile';
import PostInfo from '../Views/PostInfo';
import ChatScreen from '../Views/ChatScreen';

import Day from '../Health/Day';
import Week from '../Health/Week';
import Month from '../Health/Month';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Tab1 = createMaterialTopTabNavigator();

const FeedStack = ({navigation, route}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="myMind"
      component={UserMain}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Audiowide',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginRight: 10}}>
            <Icon.Button
              name="plus"
              size={22}
              backgroundColor="#33A6D7"
              color="#fff"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPost}
      options={{
        title: 'Add Post',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#33A6D7',
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-left" size={25} color="#fff" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Edit Profile',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#33A6D7',
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-left" size={25} color="#fff" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="PostInfo"
      component={PostInfo}
      options={{
        title: 'myMind',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#33A6D7',
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-left" size={25} color="#fff" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileMenu}
      options={{
        title: 'Profile',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#33A6D7',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-left" size={25} color="#fff" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.displayName,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#33A6D7',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Icon name="arrow-left" size={25} color="#fff" />
          </View>
        ),
      })}
    />
  </Stack.Navigator>
);

const ChatStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Buddies"
      component={BuddyChat}
      options={() => ({
        title: 'Messages',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
  </Stack.Navigator>
);

const HealthStack = ({navigation}) => (
  <Tab1.Navigator>
    <Tab1.Screen
      name="Day"
      component={Day}
      options={() => ({
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
    <Tab1.Screen
      name="Week"
      component={Week}
      options={() => ({
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
    <Tab1.Screen
      name="Month"
      component={Month}
      options={() => ({
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
  </Tab1.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileMenu}
      options={() => ({
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
    <Stack.Screen
      name="Edit Profile"
      component={EditProfile}
      options={() => ({
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#33A6D7',
          shadowColor: '#fff',
          elevation: 0,
        },
      })}
    />
  </Stack.Navigator>
);

const HomeStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'ChatScreen') {
      return false;
    }
    return true;
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#fff',
        style: {
          backgroundColor: '#33A6D7',
        },
      }}
      barStyle={{backgroundColor: '#000'}}>
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={() => ({
          tabBarLabel: 'Feed',
          tabBarIcon: ({size}) => (
            <Icon name={'home'} color="#fff" size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Buddies"
        component={ChatStack}
        options={
          (/* {route} */) => ({
            /* tabBarVisible: getTabBarVisibility(route), */
            tabBarIcon: ({size}) => (
              <Icon name="envelope" color="#fff" size={size} />
            ),
          })
        }
      />
      <Tab.Screen
        name="Health"
        component={HealthStack}
        options={{
          tabBarIcon: ({size}) => (
            <Icon name="heartbeat" color="#fff" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({size}) => <Icon name="user" color="#fff" size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeStack;

import React, {Component} from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator,createAppContainer,createStackNavigator } from 'react-navigation';

import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Upload from '../screens/Upload';
import userProfile from '../screens/userProfile';
import Comments from '../screens/Comments';

const BottomTabNavigator = createBottomTabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = "ios-home"; //might need to change it if it doesnt work on android
              return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
        }
    },
    Favorite: {
        screen: Profile,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = "ios-heart-empty"; //might need to change it if it doesnt work on android
              return <Ionicons name={iconName} size={25}  focused={focused} tintColor={tintColor}  />;
          },
          // tabBarOptions:{ // changes the whole color of the icon and text
          //   activeTintColor: 'red's 
          // },
         
        }
    },
    Post: {
        screen: Upload,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconColor = "red";
              const iconName = "ios-add-circle"; //might need to change it if it doesnt work on android
              return <Ionicons name={iconName} size={35} color={iconColor} />;
          },
        }
    },
    Chat: {
      screen: Upload,
      navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = "ios-chatboxes"; //might need to change it if it doesnt work on android
              return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
        }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = "account"; //might need to change it if it doesnt work on android
              return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
          },
        }
    }
})

const MainStack = createStackNavigator({
      Home:{screen: BottomTabNavigator},
      User:{screen: userProfile},
      Comments:{screen: Comments}
    },
    {
      initialRouteName: 'Home',
      mode: 'modal',
      // headerMode: 'none'
    }
  )


export default createAppContainer(MainStack);


import React, {Component} from 'react';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator,createAppContainer,createStackNavigator } from 'react-navigation';

import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Upload from '../screens/Upload';
import userProfile from '../screens/userProfile';
import Comments from '../screens/Comments';

const BottomTabNavigator = createBottomTabNavigator({
    Feed: {
        screen: Feed
    },
    Profile: {
        screen: Profile
    },
    Upload: {
        screen: Upload
    },
    Comments: {
      screen: Comments
    }
})

const MainStack = createStackNavigator(
    {
      Home:{screen: BottomTabNavigator},
      User:{screen: userProfile},
      Comments:{screen: Comments}
    },
    {
      initialRouteName: 'Home',
      mode: 'modal',
      headerMode: 'none'
    }
  )


export default createAppContainer(MainStack);


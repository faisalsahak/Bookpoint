import React, {Component} from 'react';
import { Platform, Text, View } from 'react-native';
import { createBottomTabNavigator,createAppContainer } from 'react-navigation';

import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Upload from '../screens/Upload';

const BottomTabNavigator = createBottomTabNavigator({
    Feed: {
        screen: Feed
    },
    Profile: {
        screen: Profile
    },
    Upload: {
        screen: Upload
    }
})

export default createAppContainer(BottomTabNavigator);


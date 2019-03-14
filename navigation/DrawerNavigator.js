import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer,createStackNavigator } from 'react-navigation';

import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import Upload from '../screens/Upload';
import userProfile from '../screens/userProfile';
import Comments from '../screens/Comments';

import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({navigation}) => {
		// console.log(navigation)
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator =  createDrawerNavigator(
	{
		Feed: {
			screen: Feed
		},
		Profile: {
			screen: Profile
		},
		Upload: {
			screen: Upload
		},
		User:{screen: userProfile},
		Comments:{screen: Comments}
	},
	DrawerConfig
);


// const MainStack = createStackNavigator(
//   {
//     Home:{screen: DrawerNavigator},
//     User:{screen: userProfile},
//     Comments:{screen: Comments}
//   },
//   {
//     initialRouteName: 'Home',
//     mode: 'modal',
//     headerMode: 'none'
//   }
// )

export default createAppContainer(DrawerNavigator);
export const navigation = navigation
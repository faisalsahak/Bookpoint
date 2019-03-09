import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import {f, auth, database} from './config/config'

import Header from './components/Header';
import BookList from './components/BookList';
// import Button from './components/Button';
import DrawerNavigator from './navigation/DrawerNavigator';
import BottomTabNavigator from './navigation/BottomTabNavigator';
// import console = require('console');

export default class App extends React.Component {
  login = async() =>{
    try{
      let user = await auth.signInWithEmailAndPassword('test@test.com', 'test123');
    }catch(err){
      console.log(err);
    }
  }

  constructor(props){
    super(props);
    this.login();
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Header headerText="BookPoint"/> */}
          {/* <HomeScreen /> */}
          
          <DrawerNavigator/>
          {/* <BookList /> */}

          {/* this renders the navigation on the bottom */}
          {/* <BottomTabNavigator /> */}
          {/* <HomeScreen /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  facebookLoginStyles: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    // alignSelf: 'center',
  },
  loginContainer: {
    flex: 1,
    marginTop:30,
    marginBottom:30,
    justifyContent:'center'
  },
  loginContainerText: {
    top: 450,
    left: 135,
    // paddingRight: 0,
    justifyContent: 'center',
    // backgroundColor:'black',
    textAlign:'center',
    flexDirection: 'column'
    // alignSelf:'center'
  },
  signOutContainerText:{
    // flex: 1,
    // left: 100,
    // bottom: -400,
    // top: 5
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    top: -500
    
  }
});

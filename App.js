import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity, Button } from 'react-native';
import {f, auth, database} from './config/config'

import Header from './components/Header';
import BookList from './components/BookList';
// import Button from './components/Button';
import DrawerNavigator from './navigation/DrawerNavigator';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import Login from './screens/Login'
// import console = require('console');

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      loggedin: false,
      userId: ''
    }

    this.showFeed = this.showFeed.bind(this);
  }

  componentDidMount(){
    var that = this;
    f.auth().onAuthStateChanged(function(user){
      if(user){
        //user logged in
        that.setState({
          loggedin: true
        });
      }else{
        //user not logged in
        that.setState({
          loggedin: false
        });
      }
    });
  }

  showFeed = ()=>{
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <View style={styles.container}>
          {/* <DrawerNavigator/>  */}
          <BottomTabNavigator/>
          
        

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

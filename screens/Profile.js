import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {f, auth, database, storage} from '../config/config';

import MenuButton from '../components/MenuButton'
import Header from '../components/Header';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loggedin: false
    }
  }

  componentDidMount = ()=>{
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


  render() {
    return (
     
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'grey'
  },
  notLoggedInStyle: {
    top: 350,
    left: 120
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  touchableComponentStyle:{
    marginTop: 10, 
    marginHorizontal: 40, 
    paddingVertical: 15, 
    borderRadius: 20, 
    borderColor: 'grey', 
    borderWidth: 1.5
  }
});

export default Profile;
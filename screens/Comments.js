import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {f, auth, database, storage} from '../config/config';


import MenuButton from '../components/MenuButton'
import Header from '../components/Header';


class Upload extends React.Component {
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
      <View>
          <View>
            <Header headerText="Upload"/>
            <MenuButton navigation={this.props.navigation} />
          </View>
          {this.state.loggedin == true ? (
            //user logged in
            <Text>Logged in</Text>
          ) : (
            //not logged in
            <View style = {styles.notLoggedInStyle}>
              <Text>Your are not Logged in</Text>
              <Text>Please Login to upload a book</Text>
            </View>
          )}
      </View>
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
    fontSize: 30,
  },
  notLoggedInStyle: {
    top: 350,
    left: 120
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});


export default Upload;

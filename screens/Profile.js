import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {f, auth, database, storage} from '../config/config';

import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import ListBooks from '../components/ListBooks';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loggedin: false,
      userId: ''
    }
  }

  componentDidMount = ()=>{
    var that = this;
    f.auth().onAuthStateChanged(function(user){
      if(user){
        //user logged in
        that.setState({
          loggedin: true,
          userId: user.uid
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
      <View style={{flex: 1}}>
        <MenuButton navigation={this.props.navigation} />
        {this.state.loggedin == true ? (
          //user is logged in
          <View style = {{flex: 1}}>
            <View >
              <Header headerText="Profile"/>
            </View>
          <View style={{justifyContent: 'space-evently', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
            <Image source ={{uri: 'https://static.boredpanda.com/blog/wp-content/uploads/2017/11/My-most-popular-pic-since-I-started-dog-photography-5a0b38cbd5e1e__880.jpg'}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50}} />
            <View style={{marginLeft: 30}}>
              <Text>Name</Text>
              <Text>@username</Text>
            </View>
          </View>
          <View style={{paddingBottom: 20, borderBottomWidth: 1}}>
            <TouchableOpacity style={styles.touchableComponentStyle}>
              <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableComponentStyle}>
              <Text style={styles.text}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableComponentStyle}>
              <Text style={styles.text}
                onPress={()=>this.props.navigation.navigate("Upload")}
              >Add Post</Text>
            </TouchableOpacity>
          </View>
          <ListBooks isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>
          </View>
        ):(
          //user not logged in
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Your are not Logged in</Text>
            <Text>Please Login to add a book</Text>
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
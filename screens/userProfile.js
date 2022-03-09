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
      loaded: false,
      userId: '',
      name:'',
      username:'',
      avatar: ''
    }
  }

  checkParams=()=>{
    var params = this.props.navigation.state.params;
    console.log("parammsssss ", params)
    if(params){
      if(params.userId){
        this.setState({userId: params.userId});
        this.fetchUserInfoById(params.userId);
      }
    }
  }

  fetchUserInfoById = (userId)=>{
    console.log("rom userProfileeeee ", userId)
    var that = this;
    //for getting the users info
    database.ref('users')
    .child(userId)
    .child('username')
    .once('value')
    .then(function(content){
      const isThere = (content.val() !== null); // the data is in the database
      if(isThere) data = content.val();
      that.setState({username: data})
    }).catch(err=> console.log(err))
    // console.log("userrrrrrr", data)
    //getting the users name
    database.ref('users')
    .child(userId)
    .child('name')
    .once('value')
    .then(function(content){
      const isThere = (content.val() !== null); // the data is in the database
      if(isThere) data = content.val();
      that.setState({name: data})
    }).catch(err=> console.log(err))
    // console.log("nameeeeeeeee", data)
    //getting the users avatar
    database.ref('users')
    .child(userId)
    .child('avatar')
    .once('value')
    .then(function(content){
      const isThere = (content.val() !== null); // the data is in the database
      if(isThere) data = content.val();
      that.setState({avatar: data, loaded: true})
    }).catch(err => console.log(err))
    // console.log("avatarrrrrr", data)
  }

  componentDidMount = ()=>{
    this.checkParams();
    
  }


  render() {
    // console.log("UserProfile ")
    return (
      <View style={{flex: 1}}>
        { <MenuButton navigation={this.props.navigation} /> }
        {this.state.loaded == false ?(
          <View>
            <Text>Loading......</Text>
          </View>
        ): (

        
          //user is logged in
          <View style = {{flex: 1}}>
            <View>
              <Header headerText="Profile"/>
            </View>
          <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightGrey', borderBottomWidth: 0.5, justifyContent: 'center',justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity
             onPress={()=> this.props.navigation.goBack()}>
              <Text style={{fontSize: 12, fontWeight: 'bold'}}>Go Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'space-evently', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
            <Image source ={{uri: this.state.avatar}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50}} />
            <View style={{marginLeft: 30}}>
              <Text>{this.state.name}</Text>
              <Text>{this.state.username}</Text>
            </View>
          </View>
        
            <ListBooks isUser={true} userId={this.state.userId} navigation={this.props.navigation} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
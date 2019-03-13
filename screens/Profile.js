import React from 'react';
import {TextInput, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {f, auth, database, storage} from '../config/config';
import { LinearGradient } from 'expo';


import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import ListBooks from '../components/ListBooks';
import Auth from '../components/Auth';
// import console = require('console');

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loggedin: false,
      userId: '',
      name:''
    }
  }

  fetchUserInfo= (userId)=>{
    var that = this;
    database.ref('users').child(userId).once('value').then(function(snapshot){
      const exists =(snapshot.val() !== null);
      if(exists) data = snapshot.val();
      that.setState({
        username: data.username,
        name: data.name,
        avatar: data.avatar,
        loggedin: true,
        userId: userId
      })
    })
  }

  componentDidMount = ()=>{
    var that = this;
    f.auth().onAuthStateChanged(function(user){
      if(user){
        console.log(user)
        //user logged in
        that.fetchUserInfo(user.uid);
      }else{
        //user not logged in
        that.setState({
          loggedin: false
          
        });
      }
    });
  }

  logoutUser= ()=>{
    f.auth().signOut();
  }

  editProfile  =()=>{
    this.setState({editingProfile: true})
  }

  saveProfile =()=>{
    var name = this.state.name;
    var username = this.state.username;

    if(name!= ''){
      database.ref('users').child(this.state.userId).child('name').set(name);
    }

    if(username!= ''){
      database.ref('users').child(this.state.userId).child('username').set(username);
    }
    this.setState({editingProfile: false})
  }
  
  
  render() {
    // console.log("Profile: ", this.state.name);
    return (
      <View style={{flex: 1}}>
        <MenuButton navigation={this.props.navigation} />
        {this.state.loggedin == true ? (
          //user is logged in
          <View style = {{flex: 1}}>
            <View >
              <Header headerText="Profile"/>
            </View>
            <View style={{justifyContent: 'space-evently', alignItems: 'center', flexDirection: 'column', paddingVertical: 10}}>
              <Image source ={{uri: this.state.avatar}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50}} />
              <View style={{marginLeft: 30}}>
                <Text>{this.state.name}</Text>
                <Text>{this.state.username}</Text>
              </View>
            </View>
          {this.state.editingProfile == true ? (
            <View style={{allignItems:'center', justifyContent:'center', paddingBottom: 20, borderBottomWidth: 1, marginLeft: 30}}>
              <TouchableOpacity onPress={()=>this.setState({editingProfile: false})}>
                <Text style={{fontWeight: 'bold', marginBottom: 5}}>Cancel Editing</Text>
              </TouchableOpacity>
              <Text>Name:</Text>
              <TextInput
                editiable={true}
                placeholder={'Enter your Name'}
                onChangeText={(text)=>this.setState({name:text})}
                value={this.state.name}
                style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                />

              <Text>Username:</Text>
              <TextInput
                editiable={true}
                placeholder={'Enter your username'}
                onChangeText={(text)=>this.setState({username:text})}
                value={this.state.username}
                style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderWidth: 1}}
                />

              <TouchableOpacity onPress={()=>this.saveProfile()} style={{maxWidth: 180}}>
                {/* <Text style={{color: 'white',fontWeight: 'bold'}}>Save Changes</Text>
               */}
               <LinearGradient start={[0, 0.5]}
                                  end={[1, 0.5]}
                                  colors={['#EFBB35', '#4AAE9B']}
                                  style={{borderRadius: 5}}>
                    <View style={styles.circleGradient}>
                      <Text style={styles.visit}>Save Changes</Text>
                    </View>
                  </LinearGradient>
              </TouchableOpacity>

            </View>
          ) : ( 
            <View style={{paddingBottom: 20, borderBottomWidth: 1}}>
              <TouchableOpacity onPress={this.logoutUser}
                  style={styles.touchableComponentStyle}>
                <Text style={styles.text}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.editProfile}
              style={styles.touchableComponentStyle}>
                <Text style={styles.text}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchableComponentStyle}>
                <Text style={styles.text}
                  onPress={()=>this.props.navigation.navigate("Upload")}
                >Add Book</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={{textAlign:'center', justifyContent: 'center', borderBottomColor: 'black'}}>User Uploads</Text>
          <ListBooks isUser={true} userId={this.state.userId} style={styles.container} />
          </View>
        ):(
          //user not logged in
          <Auth />//message={'please login to view your profddile'} />
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
  },
  circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5
  },
  visit: {
    margin: 4,
    paddingHorizontal: 4,
    textAlign: "center",
    backgroundColor: "white",
    color: '#008f68',
    fontSize: 20
  }
});

export default Profile;
import React from 'react';
import {TextInput, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {f, auth, database, storage} from '../config/config';
import { LinearGradient, ImagePicker,Permissions } from 'expo';


import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import ListBooks from '../components/ListBooks';
import Auth from '../components/Auth';
// import console = require('consoles');

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loggedin: false,
      avatarChanged: false,
      userId: '',
      name:'',
      uri: '',
      newProfilePicUri: ''
    }
  }

    randomSequence = ()=>{
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
  }

  uniqueId = ()=>{
    return this.randomSequence() + this.randomSequence()+ '-' + this.randomSequence()+ '-'
    + this.randomSequence()+ '-'+ this.randomSequence()+ '-'+ this.randomSequence()+ '-'+ this.randomSequence()+ '-'
    + this.randomSequence();
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
    var avatar = this.state.avatar;

    if(name!= ''){
      database.ref('users').child(this.state.userId).child('name').set(name);
    }

    if(username!= ''){
      database.ref('users').child(this.state.userId).child('username').set(username);
    }
    if(this.state.avatarChanged){
      this.uploadImageAsync(avatar)
      // database.ref('users').child(this.state.userId).child('avatar').set(this.state.avatar);
      // console.log("profilleeeee, ", this.state.avatar)
      // this.setState({avatar: this.state.newProfilePicUri})
    }
    this.setState({editingProfile: false})
  }

  changeProfilePicture = async()=>{
    // need to check if the call fails *********************
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    this.pickImage();
  }

  pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if(!pickerResult.cancelled){// if the user doesnt presses cancel when choosing an image
      console.log('upload image'); 
      this.setState({
        imageSelected: true,
        imageId: this.uniqueId(),
        avatar: pickerResult.uri,
        newProfilePicUri: pickerResult.uri,
        avatarChanged: true
      })
      // this.uploadImage(image.uri);
      // this._handleImagePicked(pickerResult);

    }else{// user presses cancel
      console.log('user pressed cancel')
      this.setState({
        imageSelected: false,
        avatarChanged: false
      });
    }

  };

  uploadImageAsync = async(uri)=> {
    // console.log("uriiiiiii ",uri)
    var that = this;
    // console.lg("book iddd, ",that.state.bookId)
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    // const link = this.uniqueId();
  
    const ref = 
      storage
      .ref()
      .child('images/'+that.state.username+'/'+that.state.imageId);
    const snapshot = await ref.put(blob)
  
    // We're done with the blob, close and release it
    blob.close();
  
    // return await snapshot.ref.getDownloadURL();
    const uploadUrl = await snapshot.ref.getDownloadURL();
    this.setState({avatar: uploadUrl})

    database.ref('users').child(this.state.userId).child('avatar').set(uploadUrl);
    // console.log("profilleelee ", uploadUrl)
    // this.processData(uploadUrl);
  }
  
  
  render() {
    // console.log("Profile: ", this.state.name);
    return (
      <View style={{flex: 1}}>
        <View >
          <Header headerText="Profile"/>
          <MenuButton navigation={this.props.navigation} />
        </View>
        {this.state.loggedin == true ? (
          //user is logged in
          <View style = {{flex: 1}}>
            <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column', paddingVertical: 10}}>
              <Image source ={{uri: this.state.avatar}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50}} />
              <View style={{marginLeft: 30}}>
                <Text>{this.state.name}</Text>
                <Text>{this.state.username}</Text>
              </View>
            </View>
          {this.state.editingProfile == true ? (
            <View style={{allignItems:'center', justifyContent:'center', paddingBottom: 20, borderBottomWidth: 1, marginLeft: 30}}>
            <TouchableOpacity onPress={()=>this.changeProfilePicture()}>
              <Text>Change Profile Pic</Text>
            </TouchableOpacity>
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
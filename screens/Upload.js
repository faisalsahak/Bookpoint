import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import {f, auth, database, storage} from '../config/config';
import { Permissions, ImagePicker} from 'expo';

import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import { firstFromTime } from 'uuid-js';


class Upload extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loggedin: false,
      bookId: this.uniqueId(),
      imageSelected: false,
      uploading: false,
      caption:'',
      price: '',
      title: '',
      progress: 0
    }
    // alert(this.uniqueId())
  }

  //checks the camera permissions on the users device
  _checkPermissions = async ()=>{

    //gets the Camera permissions from the user to open their gallary
    const {status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      const newCameraPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (newCameraPermission === 'granted') {
        console.log('camera permissions granted')
        //its granted.
        this.setState({camera: newCameraPermission});
      }else console.log("camera permissions failed 2nd time");
    } else {
      console.log("camera permissions granted");
      this.setState({camera: status});
    }

    //gets the Camera Roll permission from the user to open their gallary
    const {statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (statusRoll !== 'granted') {
      const newCameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newCameraRollPermission.status === 'granted') {
        //its granted.
        this.setState({cameraRoll: newCameraRollPermission});
      }else console.log("camera roll permissions failed 2nd time")
    } else {
      console.log("camera roll permissions granted");
      this.setState({cameraRoll: statusRoll});
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

  pickNewImage = async ()=>{
    await this._checkPermissions();
    //launchImageLibraryAsync
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',//just show images not videos or music
      allowsEditing: true, //so we can crop the image
      quality: 1 // best quality, runs from 0.1 to 1, 1 being the best
    })
    .catch(err => console.log(err))

    if(!image.cancelled){// if the user doesnt presses cancel when choosing an image
      console.log('upload image'); 
      this.setState({
        imageSelected: true,
        imageId: this.uniqueId(),
        uri: image.uri
      })
      // this.uploadImage(image.uri);

    }else{// user presses cancel
      console.log('user pressed cancel')
      this.setState({
        imageSelected: false
      });
    }
  }

  fixUri = (uri)=>{
    var newUri = "";
    for(var i = 0; i< uri.length; i++){
      if(uri.charAt(i) ==='/'){
        if(uri.charAt(i-1) ==='/' && uri.charAt(i+1) ==='/'){
          // console.log(uri.charAt(i-1));
          // console.log(uri.charAt(i));
          // console.log(uri.charAt(i+1));
          continue;
        }
      }
      newUri+= uri.charAt(i);
      // console.log("new uri sofar: ", newUri)
    }
    return newUri;
  }

  publishPost = ()=>{
    if(this.state.uploading ===false){

      if(this.state.caption != ''){
        this.uploadImage(this.state.uri);
      }else{ //description is empty
        alert("plesase enter something in the description")
      }
    }else{
      console.log("button already tapped once")
    }
  }
  uploadImage = async (uri)=>{
    // console.log(typeof uri)
    // uri = this.fixUri(uri)
    var metadata = {
      contentType: 'image/jpeg'
    };
    var that = this;
    var userId = f.auth().currentUser.uid;
    var imageId = that.state.bookId;
    // looking for a sequence of chars in a string and looks for a match and take htat match and loos for the file
    var regex = /(?:\.([^.]+))?$/;
    var extension = regex.exec(uri)[1];
    that.setState({
      currentFileType: extension,
      uploading: true
    });
    
    //makes a call to the uri, and uses the respons to create a blob
    // and uses the blob to upload to firebase
    // var newUri = uri;
    // console.log("regeeeeex ", newUri)
    const res = await fetch(uri);
    const blob = await res.blob();
    var FilePath = imageId+'.'+that.state.currentFileType;
    console.log("booooold ", FilePath)
    //this is where the image will be saved on firebase
    var uploadTask = storage.ref().child(FilePath).put(blob, metadata);
    
    uploadTask.on('state_changed', function(snapshot){
      var progress =((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(0);
      console.log('upload is '+ progress + '% complete');
      that.setState({
        progress: progress
      });
    }, function(err){// if errors occur
      console.log("error occurred in the upload: ", err);
    }, function(){// upload is complete
      that.setState({progress: 100});
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
        console.log(downloadURL)
        that.processData(downloadURL);
      })
    })
  }

  processData = (inputContent)=>{
    //build the oobject here to send to firebase
    var bookId = this.state.bookId;
    var userId = f.auth().currentUser.uid;
    var description = this.state.caption;
    var price = this.state.price;
    var title = this.state.title;
    var timestamp = Math.floor((Date.now())/1000);

    var bookObj ={
      author: userId,
      caption: description,
      posted: timestamp,
      picture: inputContent,
      price: price,
      title: title
    }
    console.log("object sent to Database ", bookObj);
    //send it to the database
    database.ref('/books/'+bookId).set(bookObj);
    //set books on users profile
    database.ref('/users/'+userId+'/books').set(bookObj);
    alert("book uploaded");
    this.setState({
      uploading: false,
      imageSelected: false,
      caption: '',
      price: '',
      title: ''
    });
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
            <View style={{flex: 1}}>
              {/* check if an image is selected*/}
              { this.state.imageSelected == true ?(
                <View style={{flex: 1}}>

                  <View style={{flex: 1,padding:5, top: 200}}>

                    <Text style={{marginTop: 5, color: 'black'}}>Description</Text>
                      <TextInput placeholder="Price" 
                        onChangeText={(price)=>this.setState({price: price})}
                        editable={true} style={{marginVertical: 10, height: 50, padding: 5, borderColor:'grey', borderWidth: 1, borderRadius:3, backgroundColor: 'white', color: 'black'}} />
                      <TextInput editable={true}
                        placeholder="Enter Title"
                        onChangeText={(title)=>this.setState({title: title})}
                        style={{marginVertical: 10, height: 50, padding: 5, borderColor:'grey', borderWidth: 1, borderRadius:3, backgroundColor: 'white', color: 'black'}}
                        
                      />
                    <TextInput 
                      editable = {true}
                      placeholder={"enter Description of the book"}
                      maxLength={150}
                      multiline={true}
                      onChangeText={(text) => this.setState({caption: text})}
                      style={{marginVertical: 10, height: 50, padding: 5, borderColor:'grey', borderWidth: 1, borderRadius:3, backgroundColor: 'white', color: 'black'}}
                    />
                    
                    <TouchableOpacity
                      onPress={()=> this.publishPost()}
                      style={{alignSelf: 'center', width: 170, marginHorizontal: 'auto', backgroundColor: 'purple', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20}}>
                        <Text style={{textAlign: 'center', color: 'white'}}> Upload</Text>
                      </TouchableOpacity>
                      {this.state.uploading == true ? ( //adds the spinning wheel
                        <View style={{marginTop: 10}}>
                          <Text style={{textAlign:'center', justifyContent: 'center', fontSize: 500}}>{this.state.progress}%</Text>
                        {this.state.progress != 100?(
                        <ActivityIndicator size="small" color="blue"><Text>{this.state.progress}%</Text></ActivityIndicator>
                    ):(
                        <Text>Processing</Text>
                    )}
                  </View>
                ):(
                  <View></View>
                )}
                      <Image 
                      source={{uri: this.state.uri}}
                      style={{marginTop: 10,resizeMode: 'cover', width: '25%', height: 50, top: 50}}
                  />
                  </View>
                </View>
              ) : (

             
              <View style={{ justifyContent: 'center', alignItems: 'center', top: 300}} >
                <Text style={{fontSize: 28, paddingBottom: 15}}>Upload</Text>
                <TouchableOpacity onPress={()=> this.pickNewImage()}
                  style={{paddingVertical: 19, paddingHorizontal: 18, backgroundColor: 'lightgrey', borderRadius: 5}}>
                  <Text style={{color:'black'}}>Pick Pic</Text>
                </TouchableOpacity>
                
                
                
              </View>
               )}
            </View>
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
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  text: {
    fontSize: 30,
  },
  notLoggedInStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default Upload;

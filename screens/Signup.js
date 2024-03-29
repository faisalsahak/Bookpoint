import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import {f, auth, database, storage} from '../config/config';


class Signup extends Component{
  constructor(props){
    super(props);
    this.state ={
      email: '',
      password: '',
      name: '',
      userName: ''
    }
  }
  //checks the user name the user entered agains the ones in the database
  findUserInDatabase =(data, user)=>{
    var that = this;
    const userName = this.state.username
    var isUnique = true;
    var userObj = data[user];
    if(userObj.username === userName){
      // console.log("user Info:  ", userObj.username);
      isUnique = false;
      this.setState({isUniqueUsername: isUnique});
      alert("User is not unique");
      // return true;
    }

  }
// gets the username from the user and checks it against the usernames in the database, returns true if the user name exist and alerts the user
  checkUniqueUser=()=>{
    var that = this;
    database.ref('users').orderByChild('username').once('value').then(function(snapshot){
      //checks if books are actually found in the database
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();
      // var books = that.state.books;
      for(var username in data){// goes through each user in the database
        
        that.findUserInDatabase(data, username);
        if(!that.state.isUniqueUsername)
          return;
          // return true;
        
        // that.addToFeed(books,data, book)
      }
    }).catch(err => console.log(err));
    this.setState({isUniqueUsername: true})
  }

  createUserObj = (userObj, email) =>{
    console.log(userObj, email, userObj.uid);
    var userObject = {
      name: this.state.name,
      username: this.state.username,
      avatar: 'http://www.gravatar.com/avatar',
      email: email
    };
    database.ref('users').child(userObj.uid).set(userObject);
  }

  signup = async() =>{
    const email = this.state.email;
    const password = this.state.password;
    this.checkUniqueUser();
    // const name = this.state.name;
    // const usrname = this.state.username;
    console.log("isssssuniquereeee ", this.state.isUniqueUsername);
    if(this.state.isUniqueUsername){
      if(email != '' && password != ''){
        try{
          let user = await auth.createUserWithEmailAndPassword(email,password)
          .then((userObj)=> this.createUserObj(userObj.user, email))
          .catch((err)=>alert(err))
        }catch(err){
          console.log(err);
        }
      }else{
        alert("email or password field empty");
      }
    }else{
      alert("Username "+that.state.username+ " is already taken");
      console.log("username is taken")
    }
    
  }

  render(){
    return(
      <View>
          <TouchableOpacity onPress={()=>this.props.authStepHandler()}
            style={{borderBottomWidth: 1, paddingVertical:5, marginBottom: 10, borderBottomColor:'black'}}>
            <Text style={{fontWeight: 'bold'}}>Back</Text>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', marginBottom: 20}}>Sign Up</Text>

          <Text>Full Name:</Text>
          <TextInput 
          editable={true}
          // keyboardType={'email-address'}
          placeholder={'Enter Your First and Last Name'}
          onChangeText={(text)=>this.setState({name: text})}
          value={this.state.name}
          style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
          />

          <Text>Username:</Text>
          <TextInput 
          editable={true}
          // keyboardType={'email-address'}
          placeholder={'Choose a username'}
          onChangeText={(text)=>this.setState({username: text})}
          value={this.state.username}
          style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
          />

          <Text>Email Address:</Text>
          <TextInput 
          editable={true}
          keyboardType={'email-address'}
          placeholder={'Enter Your Email'}
          onChangeText={(text)=>this.setState({email: text})}
          value={this.state.email}
          style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
          />

          <Text>Password:</Text>
          <TextInput 
          editable={true}
          secureTextEntry={true}
          placeholder={'Enter Your Password'}
          onChangeText={(text)=>this.setState({password: text})}
          value={this.state.password}
          style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
          />

          <TouchableOpacity
            onPress={()=>this.signup()}
            style={{ paddingVertical:10, paddingHorizontal:20, borderRadius: 5}}
          >
            <LinearGradient start={[0, 0.5]}
                          end={[1, 0.5]}
                          colors={['#EFBB35', '#4AAE9B']}
                          style={{borderRadius: 5}}>
            <View style={styles.circleGradient}>
              <Text style={styles.visit}>Sign Up</Text>
            </View>
          </LinearGradient>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = {
  loginStyle:{
    marginVertical: 20, flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center'
  },
  circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5
  },
  visit: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    backgroundColor: "white",
    color: '#008f68',
    fontSize: 20
  }
}


export default Signup;
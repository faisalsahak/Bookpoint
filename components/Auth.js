import React from 'react';
import {TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native';
import {f, auth, database, storage} from '../config/config';
import { LinearGradient } from 'expo';


import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import Login from '../screens/Login';
import Signup from '../screens/Signup'
// import console = require('console');


class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      authStep: 0,
      email: '',
      password: '',
      moveScreen: false
    }

    this.authStepHandler = this.authStepHandler.bind(this);
  }

  login = async() =>{
    const email = this.state.email;
    const password = this.state.password;
    if(email != '' && password != ''){
      try{
        let user = await auth.signInWithEmailAndPassword(email,password);  //'test@test.com', 'test123');
      }catch(err){
        console.log(err);
      }
    }else{
      alert("email or password empty");
    }
  }

  createUserObj = (userObj, email) =>{
    console.log(userObj, email, userObj.uid);
    var userObject = {
      name: 'tempName',
      username: 'crazyAl',
      avatar: 'http://www.gravatar.com/avatar',
      email: email
    };
    database.ref('users').child(userObj.uid).set(userObject);
  }

  signup = async() =>{
    const email = this.state.email;
    const password = this.state.password;
    if(email != '' && password != ''){
      try{
        let user = await auth.createUserWithEmailAndPassword(email,password)
        .then((userObj)=> this.createUserObj(userObj.user, email))
        .catch((err)=>alert(err))
      }catch(err){
        console.log(err);
      }
    }else{
      alert("email or password is empty");
    }
  }


  componentDidMount = ()=>{
   
  }

  authStepHandler = ()=>{
    this.setState({
      authStep: 0
    })
  }

  render() {
    return (
         
          
        <View style={{ alignContent:'center', alignItems: 'center', top: 300}}>
            {/* <Text>Your are not Logged in</Text> */}
            <Text>{this.props.message}</Text>
            {this.state.authStep == 0?(
              <View style={styles.loginStyle} > 
                <TouchableOpacity onPress={()=> this.setState({authStep: 2})}>
                  {/* <Text style={{fontWeight:'bold', color: 'blue', marginBottom: 20, fontSize: 25}}>Sign Up</Text> */}
                  {/* <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                    <Text
                      style={{backgroundColor: 'transparent',fontSize: 15,color: 'lightblue'}}>
                      Sign Up
                    </Text>
                  </LinearGradient> */}
                  {/* <TouchableOpacity onPress={() => {}}> */}
                  <LinearGradient start={[0, 0.5]}
                                  end={[1, 0.5]}
                                  colors={['#EFBB35', '#4AAE9B']}
                                  style={{borderRadius: 5, marginBottom: 20}}>
                    <View style={styles.circleGradient}>
                      <Text style={styles.visit}>Sign Up</Text>
                    </View>
                  </LinearGradient>
                {/* </TouchableOpacity> */}
                
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={()=> this.setState({authStep: 1})} style={{width: '50%'}}>
                  
                  <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                    <Text
                      style={{backgroundColor: 'transparent',fontSize: 15,color: '#fff'}}>
                      Sign in
                    </Text>
                  </LinearGradient>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=> this.setState({authStep: 1})}>
                  <LinearGradient start={[0, 0.5]}
                                  end={[1, 0.5]}
                                  colors={['#EFBB35', '#4AAE9B']}
                                  style={{borderRadius: 5}}>
                    <View style={styles.circleGradient}>
                      <Text style={styles.visit}>Login</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ): 
            <View style={{marginVertical: 20}}>
              {this.state.authStep == 1 ?(
                //login
                <Login authStepHandler = {this.authStepHandler}/>
                // <View>
                //   <TouchableOpacity onPress={()=>this.setState({authStep: 0})}
                //   style={{borderBottomWidth: 1, paddingVertical:5, marginBottom: 10, borderBottomColor:'black'}}>
                //     <Text >Back</Text>
                //   </TouchableOpacity>
                //   <Text style={{fontWeight: 'bold', marginBottom: 20}}>Login</Text>
                //   <Text>Email Address:</Text>
                //   <TextInput 
                //   editable={true}r
                //   keyboardType={'email-address'}
                //   placeholder={'Enter Your Email'}
                //   onChangeText={(text)=>this.setState({email: text})}
                //   value={this.state.email}
                //   style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                //   />

                //   <Text>Password:</Text>
                //   <TextInput 
                //   editable={true}
                //   secureTextEntry={true}
                //   placeholder={'Enter Your Password'}
                //   onChangeText={(text)=>this.setState({password: text})}
                //   value={this.state.password}
                //   style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                //   />

                //   <TouchableOpacity
                //     onPress={()=>this.login()}
                //     style={{ paddingVertical:10, paddingHorizontal:20, borderRadius: 5}}
                //   >
                //     {/* <Text>Login</Text> */}
                //     <LinearGradient start={[0, 0.5]}
                //                   end={[1, 0.5]}
                //                   colors={['#EFBB35', '#4AAE9B']}
                //                   style={{borderRadius: 5}}>
                //     <View style={styles.circleGradient}>
                //       <Text style={styles.visit}>Login</Text>
                //     </View>
                //   </LinearGradient>
                //   </TouchableOpacity>
                // </View>
              ):(
                <Signup authStepHandler = {this.authStepHandler}/>
                // <View>
                //   <TouchableOpacity onPress={()=>this.setState({authStep: 0})}
                //   style={{borderBottomWidth: 1, paddingVertical:5, marginBottom: 10, borderBottomColor:'black'}}>
                //     <Text style={{fontWeight: 'bold'}}>Back</Text>
                //   </TouchableOpacity>
                //   <Text style={{fontWeight: 'bold', marginBottom: 20}}>Sign Up</Text>
                //   <Text>Email Address:</Text>
                //   <TextInput 
                //   editable={true}
                //   keyboardType={'email-address'}
                //   placeholder={'Enter Your Email'}
                //   onChangeText={(text)=>this.setState({email: text})}
                //   value={this.state.email}
                //   style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                //   />

                //   <Text>Password:</Text>
                //   <TextInput 
                //   editable={true}
                //   secureTextEntry={true}
                //   placeholder={'Enter Your Password'}
                //   onChangeText={(text)=>this.setState({password: text})}
                //   value={this.state.password}
                //   style={{width: 250, marginVertical: 10, padding: 5, borderColor: 'grey', borderRadius: 3, borderWidth: 1}}
                //   />

                //   <TouchableOpacity
                //     onPress={()=>this.signup()}
                //     style={{ paddingVertical:10, paddingHorizontal:20, borderRadius: 5}}
                //   >
                //     <LinearGradient start={[0, 0.5]}
                //                   end={[1, 0.5]}
                //                   colors={['#EFBB35', '#4AAE9B']}
                //                   style={{borderRadius: 5}}>
                //     <View style={styles.circleGradient}>
                //       <Text style={styles.visit}>Sign Up</Text>
                //     </View>
                //   </LinearGradient>
                //   </TouchableOpacity>
                // </View>
              )}
            </View>
            }
        </View>
    );
  }
}
 {/* <View>
            <Header headerText="Comments"/>
            <MenuButton navigation={this.props.navigation} />
          </View> */}


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


export default Auth;

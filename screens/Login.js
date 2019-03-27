import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import {f, auth, database, storage} from '../config/config';


class Login extends Component{

  constructor(props){
    super(props);
    this.state ={
      email: '',
      password: ''
    }
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

  render(){
    return(
      <View>
          <TouchableOpacity onPress={()=>this.props.authStepHandler()}
          style={{borderBottomWidth: 1, paddingVertical:5, marginBottom: 10, borderBottomColor:'black'}}>
            <Text >Back</Text>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', marginBottom: 20}}>Login</Text>
          <Text>Email Address:</Text>
          <TextInput 
          editable={true}r
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
            onPress={()=>this.login()}
            style={{ paddingVertical:10, paddingHorizontal:20, borderRadius: 5}}
          >
            {/* <Text>Login</Text> */}
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


export default Login;
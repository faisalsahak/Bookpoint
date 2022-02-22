import React from 'react';
import {TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native';
import {f, auth, database, storage} from '../config/config';


import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import Auth from '../components/Auth';


class Comments extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loggedin: false,
      comments_list: []
    }
  }

  checkParams = ()=>{
    var params = this.props.navigation.state.params;
    // console.log("parammss ", params)
    if(params){
      if(params.bookId){
        console.log("id.....",params.bookId)
        this.setState({bookId: params.bookId});
        this.fetchComments(params.bookId);
      }
    }

  }

  addCommentToList = (comments_list, data, comment)=>{
    var that = this;
    var commentObj = data[comment];
    database.ref('user').child(commentObj.authro).child('username').once('value').then(function(snapshot){
      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();

      comments_list.push({
        id:comment,
        comment: commentObj.comment,
        posted: that.timeConverter(commentObj.posted),
        author: data,
        authorId: commentObj.authorId
      });

      that.setState({
        refresh: false,
        loading:false
      })

    }).catch(err => console.log(err))
  }

  fetchComments = (bookId)=>{
    var that = this;
    database.ref('comments').child(bookId).orderByChild('posted').once('value').then(function(snapshot){
      const exists = (snapshot.val() !== null);
      // console.log("snaptshots ", snapshot)
      if(exists){// add commentss to the list
        data = snapshot.val();
        var comments_list = that.state.comments_list;
        for(var comment in data){
          that.addCommentToList(comments_list, data, comment)
        }

      }else{// there are no comments for the book
        that.setState({
          comments_list:[]
        })
      }
    }).catch(err=>console.log(err));
  }

  pluralCheck = (s)=>{
    return (s===1? " ago": "s ago")
  }
  //takes in timestamp and converts it to sec/min/hour/day/year
  timeConverter = (timestamp)=>{
    var a = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - a)/ 1000);
    //converts and sees the best option to return
    var interval = Math.floor(seconds / 31536000);
    if(interval > 1) return interval+ ' year' + this.pluralCheck(interval);

    var interval = Math.floor(seconds / 2592000);
    if(interval > 1) return interval+ ' month' + this.pluralCheck(interval);

    var interval = Math.floor(seconds / 86400);
    if(interval > 1) return interval+ ' day' + this.pluralCheck(interval);

    var interval = Math.floor(seconds / 3600);
    if(interval > 1) return interval+ ' hour' + this.pluralCheck(interval);

    var interval = Math.floor(seconds / 60);
    if(interval > 1) return interval+ ' minute' + this.pluralCheck(interval);
    
    return Math.floor(seconds)+ ' second' + this.pluralCheck(seconds);
  }

  randomSequence = ()=>{
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
  }

  uniqueId = ()=>{
    return this.randomSequence() + this.randomSequence()+ '-' + this.randomSequence()+ '-'
    + this.randomSequence()+ '-'+ this.randomSequence()+ '-'+ this.randomSequence()+ '-'+ this.randomSequence()+ '-'
    + this.randomSequence();
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
    this.checkParams();
  }

  render() {
    return (
      <View>
          <View>
            <Header headerText="Comments"/>
            <MenuButton navigation={this.props.navigation} />
          </View>
          <View style={{flex:1}}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightGrey', borderBottomWidth: 0.5, justifyContent: 'center',justifyContent: 'space-between', alignItems: 'center'}}>
              <TouchableOpacity
              onPress={()=> this.props.navigation.goBack()}>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>Go Back</Text>
              </TouchableOpacity>
              <Text>Comments</Text>
              <Text style={{width:100}}></Text>
            </View>
            {this.state.comments_list == 0 ?(
              //no comments
              <Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>No Comments found......</Text>
            ) : (
              // there are comments
              <FlatList 
              refreshing={this.state.refresh}
              data={this.state.comments_list}
              keyExtractor={(item, index)=> index.toString()}
              style={{flex: 1, backgroundColor: '#eee'}}
              renderItem={({item, index})=>(
                <View key={index} style={{width: '100%', overflow: 'hidden', marginBootm: 5, justifyContent: 'space-between', borderBottomWidth:1, borderColor:'grey'}}>
                  <View>
                    <Text>{item.posted}</Text>
                    <TouchableOpacity>
                      <Text>{item.author}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              />
            )}
            {this.state.loggedin == true ? (
              //user logged in
              <Text>Logged in Comments</Text>
            ) : (
              //not logged in
              <Auth message={'Please Login to comment on a book'} />
            
            )}
        </View>
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


export default Comments;

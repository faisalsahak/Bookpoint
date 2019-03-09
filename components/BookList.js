import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {f, auth, database, storage} from '../config/config';

import axios from 'axios';

import BookDetails from './BookDetails';
// import { database } from 'firebase';

class BookList extends Component{
  

    //gets the books from the database
    renderBooks =()=>{
      this.setState({
        refresh: true,
        books: []
      });

      var that = this; //the context of this will be lost when we make a request to the data base

      database.ref('books').orderByChild('author').once('value').then(function(snapshot){
        //checks if books are actually found in the database
        const exists = (snapshot.val() !== null);
        if(exists) data = snapshot.val();
        var books = that.state.books;
        
        for(var book in data){
          var bookObj = data[book];
          database.ref('users').child(bookObj.author).child('username').once('value').then(function(snapshot){
            console.log("username!!!!!!!!!!!!", bookObj)
            const exists = (snapshot.val() !== null);
            if(exists) data = snapshot.val();
            books.push({
              id: book,
              title: bookObj.title,
              isbn: bookObj.isbn,
              image_url: bookObj.picture,
              price: bookObj.price,
              author: bookObj,
              caption: bookObj.caption,
              posted: that.timeConverter(bookObj.posted)
            });


            that.setState({
              refresh: false,
              loading: false
            });
          }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
    }

    getBooks(){
      // this.renderBooks();
      return this.state.books.map((book, index)=> 
        <BookDetails bookCollection={book} key={index}/>
        )
    }

    render(){
        // console.log(this.state.albums)
        return (
            // <Text>AlbumListsss!!!</Text>
            <View>
              {this.state.loading == true ? (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>Loading................</Text>
                </View>
              ):(
              <ScrollView>
                  {this.getBooks()}
              </ScrollView>
              )}
            </View>
        );
    }
}


export default BookList;

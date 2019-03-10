import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {f, auth, database, storage} from '../config/config';

import axios from 'axios';

import BookDetails from './BookDetails';
// import { database } from 'firebase';

class BookList extends Component{
    constructor(props){
      super(props);
      this.state = { 
        books: [],
        refresh: false,
        loading: true
      };

    }
    componentDidMount = ()=>{
      //load Books
      this.renderBooks();
    }
    // componentWillMount(){
    //     axios.get('https://bookscdn.herokuapp.com/books')
    //     .then(res => this.setState({books: res.data.books}))
    // }
    //check whether to add s after the time or not
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

    addToFeed = (books, data,book)=>{
      var that = this;
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
              posted: that.timeConverter(bookObj.posted),
              authorId: bookObj.author
            });


            that.setState({
              refresh: false,
              loading: false
            });
          }).catch(err => console.log(err));
    }

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
          that.addToFeed(books,data, book)
        }
      }).catch(err => console.log(err));
    }

    getBooks(){
      // this.renderBooks();
      return this.state.books.map((book, index)=> 
        <BookDetails bookCollection={book} key={index} navigation={this.props.navigation}/>
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

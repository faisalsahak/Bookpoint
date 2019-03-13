import React, {Component} from 'react';
import {TouchableOpacity, FlatList, StyleSheet, Text, View,Image,ScrollView} from 'react-native';
import {f, auth, database, storage} from '../config/config';
import BookDetails from './BookDetails';

class ListBooks extends Component {


  constructor(props){
    super(props);
    this.state = { 
      books: [],
      refresh: false,
      loading: true,
      empty: false
    };

  }
  componentDidMount = ()=>{
    const {isUser, userId} = this.props;
    
    if(isUser){
      //show users profile with their books
      this.renderBooks(userId);
      this.getBooks();
      // console.log("from lissstttboooooks ",this.state.books)
    }else{
      //show feed
      this.renderBooks('');
    }
    // load Books
    // this.renderBooks();
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

  addToFeed = (books, data,book, userId)=>{
    var that = this;
    var bookObj = data[book];
        database.ref('users').child(bookObj.author).child('username').once('value').then(function(snapshot){
          // console.log("username!!!!!!!!!!!!", bookObj)
          const exists = (snapshot.val() !== null);
          if(exists) data = snapshot.val();
          console.log(bookObj.author)
          if(bookObj.author == userId){// only render the books that belong to the current user
            books.push({
              id: book,
              title: bookObj.title,
              isbn: bookObj.isbn,
              image_url: bookObj.picture,
              price: bookObj.price,
              author: bookObj,
              caption: bookObj.caption,
              posted: that.timeConverter(bookObj.posted),
              timestamp: that.timeConverter(bookObj.posted),
              authorId: bookObj.author
            });

            var sortedData = [].concat(books).sort((a,b) => a.timestamp > b.timestamp);
  
            that.setState({
              refresh: false,
              loading: false,
              books: sortedData
            });
          }
          
        }).catch(err => console.log(err));
  }



  // if(userId != ''){
    //         loadRef = database.ref('books').on('value', function(s){
    //           s.forEach(function(data){
    //             // console.log("vallllll ", data.val().author)
    //             if(data.val().author === userId){// got throught all the books and find the id that matches the current users id
    //               that.addToFeed(data)
    //             }
    //             // data.forEach(function(d){
    //             //   // if(d == userId)
    //             //   console.log("authoorrrrs ", d)
    //             // })
    //           })
    //         })
    //       }

    disect(list){
      // console.log(Object.keys(list))
      // for(var item in list){
      //   console.log(item)
      // }
      list.forEach(function(item){
        console.log(item)
        // console.log("end of item")
      })
    }

  //gets the books from the database
  renderBooks =(userId)=>{
    this.setState({
      refresh: true,
      books: []
    });

    var that = this; //the context of this will be lost when we make a request to the data base

    database.ref('books').orderByChild('author').once('value').then(function(snapshot){
      //checks if books are actually found in the database
      const exists = (snapshot.val() !== null);
      if(exists){ 
        data = snapshot.val();
        var books = that.state.books;
        that.setState({empty: false})
        // snapshot.forEach(function(a){
        //   if(a.val().author == userId){
        //     // console.log(typeof snapshot)
        //     // var tempList = [];
        //     // a.forEach(function(ba){
        //       that.disect(a)

        //     // })
        //           //   that.addToFeed(books,data, book)

        //   }
        //   // a.forEach(function(b){
        //   //   i
        //   //   console.log(b);

        //   // })
        // })
        // console.log(data)
        for(var book in data){
          that.addToFeed(books,data, book, userId)
        }
      }else{
        that.setState({empty: true})
      }
    }).catch(err => console.log(err));
  }

  getBooks(){
    // this.renderBooks();
    return this.state.books.map((book, index)=> 
      <BookDetails bookCollection={book} key={index} navigation={this.props.navigation}/>
      )
  }



  // constructor(props){
  //   super(props);
    
  // }
  // state = {
  //   books: [],
  //   refresh: false,
  //   loading: false
  // }
  // componentDidMount(){
  //   const {isUser, userId} = this.props;
    
  //   if(isUser){
  //     //show users profile with their books
  //     this.renderBooks(userId);
  //     this.getBooks();
  //     // console.log("from lissstttboooooks ",this.state.books)
  //   }else{
  //     //show feed
  //     this.renderBooks('');
  //   }
  // }
    
  //   //check whether to add s after the time or not
  //   pluralCheck = (s)=>{
  //     return (s===1? " ago": "s ago")
  //   }
  //   //takes in timestamp and converts it to sec/min/hour/day/year
  //   timeConverter = (timestamp)=>{
  //     var a = new Date(timestamp * 1000);
  //     var seconds = Math.floor((new Date() - a)/ 1000);
  //     //converts and sees the best option to return
  //     var interval = Math.floor(seconds / 31536000);
  //     if(interval > 1) return interval+ ' year' + this.pluralCheck(interval);

  //     var interval = Math.floor(seconds / 2592000);
  //     if(interval > 1) return interval+ ' month' + this.pluralCheck(interval);

  //     var interval = Math.floor(seconds / 86400);
  //     if(interval > 1) return interval+ ' day' + this.pluralCheck(interval);

  //     var interval = Math.floor(seconds / 3600);
  //     if(interval > 1) return interval+ ' hour' + this.pluralCheck(interval);

  //     var interval = Math.floor(seconds / 60);
  //     if(interval > 1) return interval+ ' minute' + this.pluralCheck(interval);
      
  //     return Math.floor(seconds)+ ' second' + this.pluralCheck(seconds);
  //   }

  //   addToFeed = ( data,book='')=>{
  //     // this.setState({
  //     //   refresh: true,
  //     //   books: []
  //     // });
  //     var books = [...this.state.books];
  //     var that = this;
  //     // var bookObj = data[book];
  //     // database.ref('users').child(bookObj.author).child('books').once('value').then(function(snapshot){
  //     //   console.log("username!!!!!!!!!!!!", bookObj)
  //     //   const exists = (snapshot.val() !== null);
  //     //   if(exists) data = snapshot.val();
  //       books.push({
  //         // id: book,
  //         title: data.title,
  //         // isbn: bookObj.isbn,
  //         image_url: data.picture,
  //         price: data.price,
  //         author: data,
  //         caption: data.caption,
  //         posted: that.timeConverter(data.posted),
  //         authorId: data.author
  //       });
        
        
        
  //     // }).catch(err => console.log(err));

  //     // console.log("bookObjjjjjj ", data)
      
  //     that.setState({
  //         refresh: false,
  //         loading: false,
  //         books: books
  //       });
  //     }
  
  //     //gets the books from the database
  //     renderBooks =(userId= '')=>{
  //       this.setState({
  //         refresh: true,
  //         books: []
  //       });
  
  //       var that = this; //the context of this will be lost when we make a request to the data base
  //       var loadRef = database.ref('books');
  //       // console.log("loadRedffffff ",loadRef)
  //       if(userId != ''){
  //         loadRef = database.ref('books').on('value', function(s){
  //           s.forEach(function(data){
  //             // console.log("vallllll ", data.val().author)
  //             if(data.val().author === userId){// got throught all the books and find the id that matches the current users id
  //               that.addToFeed(data)
  //             }
  //             // data.forEach(function(d){
  //             //   // if(d == userId)
  //             //   console.log("authoorrrrs ", d)
  //             // })
  //           })
  //         })
  //       }
        
  //       // console.log("booooookkksss, ",book)
  //     //   loadRef.orderByChild('posted').once('value').then(function(snapshot){
  //     //     //checks if books are actually found in the database
  //     //     const exists = (snapshot.val() !== null);
  //         // if(exists) data = snapshot.val();
  //         // var books = that.state.books;
          
  //         // for(var book in data){
  //         //   that.addToFeed(data, book)
  //     //     }
  //     //   }).catch(err => console.log(err));
  //     }

  //     stateBook =()=>{
  //       console.log('in the stateBoooooooooooooooks')
  //       var b = [...this.state.books];
  //       // b.forEach(function(book){
  //         // book.forEach(function(data){
  //           console.log(b.author);

  //         // })
  //       // })
  //     }
  
  //     getBooks(){
  //       // this.renderBooks();
  //       // this.stateBook();
  //       console.log("size of books ", this.state.books.length)
  //       return this.state.books.map((book, index)=>{
  //         // console.log("moment of truth ",book.author),
  //         <BookDetails bookCollection={book} key={index} navigation={this.props.navigation}/>
  //       }
  //         )
  //     }
  
      render(){
        // var m = this.state.books
        // m.forEach(function(a){
        //   console.log("aaaa", a)
          
        // })
          return (
              // <Text>AlbumListsss!!!</Text>
              
              <View>
                {this.state.loading === true ? (
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.empty == true?(
                      <Text>No Posts Found</Text>
                    ):(
                      <Text>Loading................</Text>
                    )}
                  </View>
                ):(
                 
                  <View>
                    <Text style={{textAlign: 'center', justifyContent:'center'}}>Total Books: {this.state.books.length}</Text>
                    {/* <Text>{this.state.books[0]}</Text> */}
                    <ScrollView>
                    {this.getBooks()}
                    </ScrollView>
                    </View>
                )}
              </View>
          );
      }
}


export default ListBooks;
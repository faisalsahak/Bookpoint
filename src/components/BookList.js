import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import axios from 'axios';

import BookDetails from './BookDetails';

class BookList extends Component{
    state = { books: []};
    componentWillMount(){
        axios.get('https://bookscdn.herokuapp.com/books')
        .then(res => this.setState({books: res.data.books}))
    }

    renderAlbums(){
      return this.state.books.map((book, index)=> 
        <BookDetails bookCollection={book} key={index}/>
        )
    }

    render(){
        // console.log(this.state.albums)
        return (
            // <Text>AlbumListsss!!!</Text>
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}


export default BookList;

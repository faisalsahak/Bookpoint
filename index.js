import React from 'react';
import {AppRegistry, View} from 'react-native';
import Header from './src/components/Header';
import BookList from './src/components/BookList'

const App = ()=> {
    return (
        <View style={{flex: 1}}>
            <Header headerText="BookPoint"/>
            <BookList />
        </View>
    )
}

AppRegistry.registerComponent('Bookpoint', () => App);

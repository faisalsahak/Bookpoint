import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import BookList from '../components/BookList';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
          <Header headerText="Home"/>
          <MenuButton navigation={this.props.navigation} />
          <BookList />
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
  }
});

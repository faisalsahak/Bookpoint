import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuButton from '../components/MenuButton'
import Header from '../components/Header';
import BookList from '../components/BookList';

export default class Feed extends React.Component {
  render() {
    // console.log("proppss", this.props.navigations)
    return (
      <View>
          <Header headerText="Feed"/>
          <MenuButton navigation={this.props.navigation} />
          <BookList navigation = {this.props.navigation}/>
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

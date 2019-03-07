import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import Header from './components/Header';
// import BookList from './components/BookList';
// import Button from './components/Button';

import DrawerNavigator from './navigation/DrawerNavigator'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Header headerText="BookPoint"/> */}
          {/* <HomeScreen /> */}
          {/* <BookList /> */}
          {/* <HomeScreen /> */}
        <DrawerNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

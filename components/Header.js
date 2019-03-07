import React,{Component} from 'react';
import {Text, View} from 'react-native';

import MenuButtons from './MenuButton';


// const Header = (props) => {
class Header extends Component{

  render(){
    const {textStyle, viewStyle} = styles;
    return(
      <View style={viewStyle}>
        <MenuButtons />
        <Text style={textStyle}>{this.props.headerText}</Text>
      </View>
    );
  }
 
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elavation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
};


export default Header;
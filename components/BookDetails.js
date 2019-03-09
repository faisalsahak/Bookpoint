import React, {Component} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';


const Book = ({bookCollection})=>{
    const {title, isbn, author, price, image_url, caption, posted} = bookCollection;
    const {headerContentStyle, thumbnailStyle,
            thumbnailContainerStyle, headerTextStyle,
            imageStyle
          } = styles;
    return(
        <Card style={thumbnailStyle}>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image source={{uri: image_url}} style={thumbnailStyle}/>
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{title}</Text>
                    <Text>@{author.author}</Text>
                    <Text>Time Ago: {posted}</Text>
                    <Text>Price: {price}</Text>
                </View>
            </CardSection>
            <CardSection>
                <Image 
                    style={imageStyle}
                    source={{uri: image_url}} 
                    />
            </CardSection>
            <CardSection>
                <View style={{padding: 5}}>
                  <Text>{caption}</Text>
                  <Text style={{marginTop: 10, textAlign: 'center'}}>Contact...</Text>
                </View>
                {/* <Button onPress = {() =>Linking.openURL(website)}>Buy Now!</Button> */}
            </CardSection>
        </Card>
    );
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle:{
        fontSize: 18
    },
    thumbnailStyle: {
        width: 50,
        height: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle:{
        // position: 'relative',
        // float: 'left',
        // width:  100,
        // height: 100,
        // backgroundPosition: 50% 50%,
        // backgroundRepeat:   'no-repeat',
        // backgroundSize:     'cover',
        height: 200,
        flex: 1,
        width: null
    }
}

export default Book;
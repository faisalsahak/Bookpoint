import React, {Component} from 'react';
import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
// import Ionicons from '@expo/vector-icons/Ionicons';


class Book extends Component{
    render(){
        // console.log("from BookDetail ", this.props)
        const {title, author, price, image_url, caption, posted, authorId, id} = this.props.bookCollection;
        const {headerContentStyle, thumbnailStyle,
                thumbnailContainerStyle, headerTextStyle,
                imageStyle, cardStyle
            } = styles;
        return(
            <Card style={cardStyle}>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image source={{uri: image_url}} style={thumbnailStyle}/>
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{title}</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('User',{userId: authorId})}>
                            <Text>@{author.author}</Text>
                        </TouchableOpacity>
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
                        <View style={{width: '100%', flexDirection: 'row'}}>
                            <Text style={{top: 15, textAlign: 'center'}}>Contact...</Text>
                            <TouchableOpacity 
                            >
                                <Ionicons
                                    name="md-mail"
                                    color="#000000"
                                    size={22}
                                    style={{textAlign: 'center', left: 265, top: 15}}
                                    onPress={()=> this.props.navigation.navigate('Comments', {bookId: id})}
                                    // style={styles.menuIcon}
                                    // onPress={() => this.props.navigation.toggleDrawer()}
                                />
                            </TouchableOpacity>
                            {/* <Text>View Comments</Text> */}
                        </View>
                    </View>
                    {/* <Button onPress = {() =>Linking.openURL(website)}>Buy Now!</Button> */}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    cardStyle:{
        maxHeight: 150,
        maxWidth: 100
    },
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
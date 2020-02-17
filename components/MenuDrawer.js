import React from 'react';
import {
	View, 
	Text,
	Image,
	ScrollView,
	Platform,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import {f, auth, database, storage} from '../config/config';

// import console = require('console');

const WIDTH = Dimensions.get('window').width 
const HEIGHT = Dimensions.get('window').height 

export default class MenuDrawer extends React.Component {
	constructor(props){
		super(props);
		this.state={
			loggedin: false,
			username: '',
			avatar: ''
		}
	}

	navLink(nav, text) {
		return(
			<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
	}

	fetchUserInfo= (userId)=>{
		var that = this;
		database.ref('users').child(userId).once('value').then(function(snapshot){
		  const exists =(snapshot.val() !== null);
		  if(exists) data = snapshot.val();
		  console.log('MenuDrawer file, ', data)
		  that.setState({
			username: data.username,
			avatar: data.avatar,
			loggedin: true,
			userId: userId
		  })
		})
	  }
	
	  componentDidMount = ()=>{
		var that = this;
		f.auth().onAuthStateChanged(function(user){
		  if(user){
			console.log(user)
			//user logged in
			that.fetchUserInfo(user.uid);
		  }else{
			//user not logged in
			that.setState({
			  loggedin: false
			  
			});
		  }
		});
	  }

	render() {
		return(
			<View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<View style={styles.profile}>
							<View style={styles.imgView}>
								<TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile',{userId: this.state.userId})}>
									<Image style={styles.img} source={{uri: this.state.avatar}} />

								</TouchableOpacity>
							</View>
							<View style={styles.profileText}>
								<Text style={styles.name}>{this.state.username}</Text>
							</View>
						</View>
					</View>
					<View style={styles.bottomLinks}>
						{this.navLink('Feed', 'Feed')}
						{this.navLink('Profile', 'Profile')}
						{this.navLink('Upload', 'Upload')}
						
						
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<Text style={styles.description}>BookPoint</Text>
					<Text style={styles.version}>version 1.0</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightgray',
	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	topLinks:{
		height: 160,
		backgroundColor: 'black',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1, 
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1, 
		marginLeft: 20,
		fontSize: 16,
	}
})
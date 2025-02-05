import React, {Component} from 'react';
import {Image, View, Text, TextInput,StyleSheet, Button} from 'react-native';
import StaticContainer from "react-native-web/src/vendor/react-native/StaticContainer";
import * as firebase from "firebase";
import Colors from "../constants/Colors";
import SubmitButton from "../components/SubmitButton";



//LOGIN CONTAINER
export default class LoginScreen extends React.Component{
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
        console.log(this.state.errorMessage);
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}));
        firebase.auth().onAuthStateChanged(user => {
           if(user != null){
               if(!user.emailVerified){
                   // console.log(user.emailVerified);
                   // user.sendEmailVerification().then(function() {
                   //     alert('Please verify your email! New verification email send!');
                   // }).catch(function(error) {
                   //     // An error happened.
                   // });
                   alert('Please verify your email!');
               }else{
                   this.props.navigation.navigate( "Main");
               }
           }

        })



    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{padding:50,}} source={require('../assets/images/D_logo.png')}/>
                <Text style={{color: Colors.buttonColor, padding:20, fontSize: '20em',fontWeight:'bold'}}>Donation Place</Text>
                <Text style={{color:'red'}}>{this.state.errorMessage}</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <SubmitButton click = {this.handleLogin}>Sign In</SubmitButton>
                <View style={styles.signUpContainer}>
                <Text >Don't have an account?</Text>
                <Button
                    title="Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
                </View>
            </View>

        );
    }
}

// STYLING 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textInput: {
        borderBottomColor: "#8A8F9E",
        width: '80%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
        marginTop: 10
    },
    signUpContainer:{
        flexDirection: "row",
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },
});

import { View, Text,TouchableOpacity,TextInput,StyleSheet,Alert } from 'react-native'
import React,{useRef,useState} from 'react'
import { FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import {firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';

const Otp = () => {
 const [phoneNumber,setPhoneNumber]=useState('');
 const [code,setCode]=useState('');
 const [verificationId, setVerificationId]=useState(null);

 const recaptchaVerifier=useRef(null);
  const sendVerification= ()=>
  {
    const phoneProvider= new firebase.auth.PhoneAuthProvider();
    phoneProvider
    .verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
    .then(setVerificationId);
    setPhoneNumber('');

  };
  
    const confirmCode= ()=>
    {
        const credential= firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );

        firebase.auth().signInWithCredential(credential)
        .then(()=>{
            setCode('');
        })
        .catch((error)=>{
            // show an alert
            alert(error);
        })
        Alert.alert(
            'Login Successful. Welcome to DashBoard',
        );
    }
         return (
            <View style={styles.container}>
                <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={ firebaseConfig}
                />
                <Text style={styles.otpText}>
                    Login using OTP
                </Text>
                <TextInput
                placeholder='Phone Number with country code'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.buttonText}>
                    Send Verification

                    </Text>
                </TouchableOpacity>
                <TextInput
                placeholder='Confirm code'
                onChangeText={setCode}
                keyboardType='number-pad'
              
                style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                    <Text style={styles.buttonText}>
                    confirm Verification

                    </Text>
                </TouchableOpacity>
            </View>
         )

}

export default Otp

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center',


    },

    textInput:{
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:20,
        fontSize:24,
        borderBottomWidth:2,
        borderBottomColor:'black',
        marginBottom:20,
        textAlign:'center',
        color:'#fff'
    },
    sendVerification:{
        padding:20,
        backgroundColor:'skyblue',
        borderRadius:10,

    },
    sendCode:{
        padding:20,
        backgroundColor:'skyblue',
        borderRadius:10,

    },

    buttonText:{
        textAlign:'center',
        color:'black',
        fontWeight:'bold',


    },

    otpText:{
        fontSize:24,
        fontWeight:'bold',
        color:'black',margin:20,


    }

});
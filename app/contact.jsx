import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

const Explore = () => {
  const [textEmail, onChangeTextEmail] = useState('');
  const [textMessage, onChangeTextMessage] = useState('');

   const handleSubmit = () => {
    onChangeTextEmail('');
    onChangeTextMessage('');
    Alert.alert('Mail Sent', 'Your message has been successfully sent!');
  };
   
  const handleFacebook = async () => { 
      Linking.openURL('https://www.facebook.com'); 
    };

  const handleInstagram = async () => { 
    Linking.openURL('https://www.instagram.com'); 
  };
  const handleTikTok = async () => { 
    Linking.openURL('https://www.tiktok.com'); 
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>E-Mail:</Text>
      <TextInput
        style={styles.input1}
        onChangeText={onChangeTextEmail}
        value={textEmail}
        placeholder="example@domain.com"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.text}>Message:</Text>
      <TextInput
        style={styles.input2}
        onChangeText={onChangeTextMessage}
        value={textMessage}
        placeholder="I would like to..."
        placeholderTextColor="#A0A0A0"
        multiline={true}
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={styles.buttonSubmit} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={styles.buttonSocial} 
          onPress={handleFacebook}
        >
          <AntDesign name="facebook-square" size={40} color="#151718" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSocial} 
          onPress={handleInstagram} 
        >
          <AntDesign name="instagram" size={40} color="#151718" /> 
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSocial}
          onPress={handleTikTok}
        >
          <FontAwesome5 name="tiktok" size={40} color="#151718" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFD29A',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#151718',
    marginBottom: 40,
  },
  text: {
    color: '#3b3b3b',
    marginLeft: 55,
    paddingBottom: 2,
    marginTop: 10
  },
  input1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 10,
    marginHorizontal: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  input2:{
    height: 250,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 10,
    marginHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
   buttonSubmit:{
    backgroundColor: '#151718',
    paddingVertical: 12,
    marginHorizontal: 150, 
    borderRadius: 10,
    alignItems: 'center', 
    marginBottom: 10, 
  },
  socialButtonsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    marginHorizontal: 50, 
    marginTop: 80, 
    marginBottom: 10, 
  },
  buttonSocial: {
    paddingVertical: 12,
    paddingHorizontal: 20, 
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold', 
  },
});

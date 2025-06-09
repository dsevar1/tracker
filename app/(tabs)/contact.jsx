import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Explore = () => {
  const [text, onChangeText] = useState('Useless Text');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFD29A',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#151718',
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    width: '100%',
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});

export default function GreetingSetup() {
  const [name, setName] = useState('');
  const [isNameSaved, setIsNameSaved] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setIsNameSaved(true);
          navigation.replace('TodoList', { name: storedName }); // Pass name to TodoList
        }
      } catch (error) {
        console.error('Failed to check name:', error);
      }
    };

    checkName();
  }, [navigation]);

  const saveName = async () => {
    if (name.trim()) {
      try {
        await AsyncStorage.setItem('name', name.trim());
        setIsNameSaved(true);
        navigation.replace('TodoList', { name: name.trim() }); // Pass name to TodoList
      } catch (error) {
        console.error('Failed to save the name:', error);
      }
    }
  };

  if (isNameSaved) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Your name has been saved!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <TouchableOpacity style={styles.button} onPress={saveName}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

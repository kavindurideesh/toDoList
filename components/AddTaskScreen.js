import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useTasks } from '../contexts/TaskContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default function AddTaskScreen({ navigation }) {
  const [text, setText] = useState('');
  const { addTask } = useTasks();

  const handleAdd = () => {
    addTask(text);
    setText('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="New Task"
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Task" onPress={handleAdd} />
      </View>
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
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

export default function EditTaskScreen({ route, navigation }) {
  const { task } = route.params; // Get task from route params
  const { updateTask } = useTasks(); // Update task function
  const [text, setText] = useState(task.text);

  useEffect(() => {
    setText(task.text); // Initialize text with current task text
  }, [task]);

  const handleUpdate = () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    updateTask(task.id, text); // Update the task
    navigation.goBack(); // Navigate back after update
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Edit Task"
      />
      <View style={styles.buttonContainer}>
        <Button title="Update Task" onPress={handleUpdate} />
      </View>
    </View>
  );
}

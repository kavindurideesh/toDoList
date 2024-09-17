import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Picker } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default function EditTask() {
  const route = useRoute();
  const navigation = useNavigation();
  const [task, setTask] = useState(route.params?.task || {});
  const [text, setText] = useState(task.text || '');
  const [category, setCategory] = useState(task.category || 'Work');
  const [priority, setPriority] = useState(task.priority || 'Medium');
  const [dueDate, setDueDate] = useState(task.dueDate || new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setText(task.text);
    setCategory(task.category);
    setPriority(task.priority);
    setDueDate(task.dueDate);
  }, [task]);

  const handleUpdateTask = async () => {
    const updatedTask = {
      ...task,
      text,
      category,
      priority,
      dueDate,
    };

    try {
      let tasksString = await AsyncStorage.getItem('tasks');
      let tasks = tasksString ? JSON.parse(tasksString) : [];
      tasks = tasks.map(t => t.id === task.id ? updatedTask : t);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack(); // Navigate back to the list
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Task Description</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Task description"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {['Work', 'Personal', 'Home', 'Family', 'Health', 'Finance', 'Social', 'Learning', 'Travel', 'Miscellaneous'].map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Priority</Text>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Due Date</Text>
        <TextInput
          style={styles.textInput}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="YYYY-MM-DD"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
        <Text style={styles.buttonText}>Update Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

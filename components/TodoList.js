import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 20,
    color: '#333',
    position: 'absolute',
    top: 10,
    left: 20,
  },
  listContainer: {
    flex: 1,
    marginTop: 50,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  inactiveFilter: {
    backgroundColor: '#FF6347',
  },
  searchContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});

export default function TodoList({ route, navigation }) {
  const { tasks, deleteTask, toggleCompleted } = useTasks();
  const { userName } = route.params || {};
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply filter and search to tasks
  const filteredTasks = tasks
    .filter(task => {
      // Filter by completion status
      if (filter === 'Todo' && task.completed) return false;
      if (filter === 'Completed' && !task.completed) return false;
      return true;
    })
    .filter(task => task.text.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      {/* Greeting section */}
      {userName && <Text style={styles.greeting}>Hello, {userName}!</Text>}
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search tasks"
        />
      </View>
      
      {/* Filter Buttons */}
      <View style={styles.filterButtonsContainer}>
        {['Todo', 'Completed', 'All'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f ? styles.activeFilter : styles.inactiveFilter]}
            onPress={() => setFilter(f)}
          >
            <Text style={styles.filterButtonText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Task list section */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              task={item}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              onEdit={() => navigation.navigate('EditTask', { task: item })}
            />
          )}
        />
      </View>

      {/* Add Task button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Add Task"
          onPress={() => navigation.navigate('AddTask')}
        />
      </View>
    </SafeAreaView>
  );
}

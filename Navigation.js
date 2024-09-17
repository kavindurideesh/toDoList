// Navigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TodoList from './components/TodoList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen name="TodoList" component={TodoList} options={{ title: 'To-Do List' }} />
        <Stack.Screen name="AddTask" component={AddTask} options={{ title: 'Add Task' }} />
        <Stack.Screen name="EditTask" component={EditTask} options={{ title: 'Edit Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

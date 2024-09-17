import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import TodoList from './components/TodoList';
import AddTaskScreen from './components/AddTaskScreen';
import WelcomeScreen from './components/WelcomeScreen';
import EditTaskScreen from './components/EditTaskScreen'; // Ensure this import is correct
import { TaskProvider } from './contexts/TaskContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen} 
              options={{ title: 'Welcome' }} 
            />
            <Stack.Screen 
              name="TodoList" 
              component={TodoList} 
              options={{ title: 'Todo List' }} 
            />
            <Stack.Screen 
              name="AddTask" 
              component={AddTaskScreen} 
              options={{ title: 'Add Task' }} 
            />
            <Stack.Screen 
              name="EditTask" 
              component={EditTaskScreen} 
              options={{ title: 'Edit Task' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </PaperProvider>
  );
}

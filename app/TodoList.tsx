import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoList() {
  const { groupIndex } = useLocalSearchParams();
  const groupId = groupIndex as string;

  const [groupItems, setGroupItems] = useState<{ id: string, name: string, todos: string[] }[]>([]);
  
  const [todoItem, setTodoItem] = useState<string>('');
  
  const [todoList, setTodoList] = useState<string[]>([]);

  // Load group items from AsyncStorage when the component mounts or when groupId changes
  useEffect(() => {
    const loadGroupItems = async () => {
      try {
        // Fetch stored groups from AsyncStorage
        const storedGroups = await AsyncStorage.getItem('groupItems');
        if (storedGroups) {
          const parsedGroups = JSON.parse(storedGroups);
          setGroupItems(parsedGroups);

          // Find the current group by its ID and set the todo list
          const currentGroup = parsedGroups.find((group: any) => group.id === groupId);
          setTodoList(currentGroup?.todos || []);
        }
      } catch (error) {
        console.error("Failed to load group items:", error);
      }
    };
    loadGroupItems();
  }, [groupId]);

  // Save updated todo list to AsyncStorage and update the state
  const saveChanges = async (updatedTodos: string[]) => {
    // Map through groups to update the todos for the current group
    const updatedGroups = groupItems.map(group =>
      group.id === groupId ? { ...group, todos: updatedTodos } : group
    );
    
    // Update the groupItems state with modified todos
    setGroupItems(updatedGroups);

    // Store the updated group items in AsyncStorage
    await AsyncStorage.setItem('groupItems', JSON.stringify(updatedGroups));
  };

  // Handle adding a new todo item
  const handleAddTodo = () => {
    if (todoItem.trim()) {
      // Add the new todo to the list and update the state
      const updatedTodos = [...todoList, todoItem];
      setTodoList(updatedTodos);
      saveChanges(updatedTodos);
      
      // Clear the input field after adding the todo
      setTodoItem('');
    } else {
      Alert.alert("Invalid Input", "Todo cannot be empty.");
    }
  };

  // Handle deleting a todo item by index
  const handleDeleteTodo = (index: number) => {
    // Create a copy of the todo list and remove the specified item
    const updatedTodos = [...todoList];
    updatedTodos.splice(index, 1);
    
    // Update the state and save the modified list
    setTodoList(updatedTodos);
    saveChanges(updatedTodos);
  };

  return (
    <View style={styles.container}>
      {/* Header to display the title of the Todo list */}
      <Text style={styles.header}>Todos</Text>

      {/* FlatList to render the list of todos and make it scrollable */}
      <FlatList
        data={todoList}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeleteTodo(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}  // Add padding to prevent overlap with input
      />

      {/* Input field for adding a new todo item */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTodoWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a Todo"
          value={todoItem}
          onChangeText={setTodoItem}
        />
        <TouchableOpacity onPress={handleAddTodo} disabled={!todoItem.trim()}>
          <View style={[styles.addWrapper, !todoItem.trim() && { backgroundColor: '#E0E0E0' }]}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
  },
  deleteText: {
    color: 'red',
  },
  writeTodoWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    fontSize: 16,
  },
  addWrapper: {
    marginLeft: 10,
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
  },
});

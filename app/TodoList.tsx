import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoList() {
  const { groupIndex, groupName } = useLocalSearchParams();
  const groupIdx = parseInt(groupIndex as string, 10);

  const [groupItems, setGroupItems] = useState<{ name: string, todos: string[] }[]>([]);
  const [todoItem, setTodoItem] = useState<string>('');
  const [todoList, setTodoList] = useState<string[]>([]);

  // Load groupItems and set todoList from AsyncStorage on component mount
  useEffect(() => {
    const loadGroupItems = async () => {
      const storedGroups = await AsyncStorage.getItem('groupItems');
      if (storedGroups) {
        const parsedGroups = JSON.parse(storedGroups);
        setGroupItems(parsedGroups);
        setTodoList(parsedGroups[groupIdx].todos || []); // Load current group's todos
      }
    };
    loadGroupItems();
  }, [groupIdx]);

  // Save changes to AsyncStorage
  const saveChanges = async (updatedTodos: string[]) => {
    const updatedGroups = [...groupItems];
    updatedGroups[groupIdx].todos = updatedTodos; // Update the current group's todos
    setGroupItems(updatedGroups);
    await AsyncStorage.setItem('groupItems', JSON.stringify(updatedGroups));
  };

  const handleAddTodo = () => {
    if (todoItem.trim()) {
      const updatedTodos = [...todoList, todoItem];
      setTodoList(updatedTodos); // Update local state
      saveChanges(updatedTodos); // Update global state and AsyncStorage
      setTodoItem('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = [...todoList];
    updatedTodos.splice(index, 1); // Remove the selected todo
    setTodoList(updatedTodos); // Update local state
    saveChanges(updatedTodos); // Update global state and AsyncStorage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{groupName} Todos</Text>

      <FlatList
        data={todoList}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeleteTodo(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTodoWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a Todo"
          value={todoItem}
          onChangeText={setTodoItem}
        />
        <TouchableOpacity onPress={handleAddTodo}>
          <View style={styles.addWrapper}>
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
    justifyContent: 'space-around',
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
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
  },
});

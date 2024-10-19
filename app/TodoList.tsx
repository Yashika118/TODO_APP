import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function TodoList() {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<{ id: string, text: string }[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const { groupIndex } = useLocalSearchParams<{ groupIndex: string }>();
  const router = useRouter();

  // Load todos from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedGroups = await AsyncStorage.getItem('groupItems');
        const groups = storedGroups ? JSON.parse(storedGroups) : [];

        const currentGroup = groups.find((group: { id: string }) => group.id === groupIndex);
        if (currentGroup) {
          setGroupName(currentGroup.name);
          setTodos(currentGroup.todos.map((todo: string) => ({ id: uuid.v4() as string, text: todo })));
        }
      } catch (error) {
        console.error("Failed to load todos:", error);
      }
    };
    loadTodos();
  }, [groupIndex]);

  // Save todos to AsyncStorage whenever the todos state changes
  useEffect(() => {
    const saveTodos = async () => {
      try {
        const storedGroups = await AsyncStorage.getItem('groupItems');
        const groups = storedGroups ? JSON.parse(storedGroups) : [];

        const updatedGroups = groups.map((group: { id: string, name: string, todos: string[] }) => {
          if (group.id === groupIndex) {
            return { ...group, todos: todos.map(todo => todo.text) };
          }
          return group;
        });

        await AsyncStorage.setItem('groupItems', JSON.stringify(updatedGroups));
      } catch (error) {
        console.error("Failed to save todos:", error);
      }
    };
    saveTodos();
  }, [todos, groupIndex]);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (todo.trim()) {
      const newTodo = { id: uuid.v4() as string, text: todo };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTodo('');
    } else {
      Alert.alert("Invalid Input", "Todo cannot be empty.");
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Handle updating a todo
  const handleUpdateTodo = (id: string, newText: string) => {
    if (newText.trim()) {
      setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
    } else {
      Alert.alert("Invalid Input", "Todo cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{groupName} - TODOs</Text>
      
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TextInput
              style={styles.todoText}
              value={item.text}
              onChangeText={(newText) => handleUpdateTodo(item.id, newText)}
            />
            <TouchableOpacity onPress={() => handleDeleteTodo(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.addTodoWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Add a TODO"
          value={todo}
          onChangeText={setTodo}
        />
        <TouchableOpacity onPress={handleAddTodo} disabled={!todo.trim()}>
          <View style={[styles.addButton, !todo.trim() && { backgroundColor: '#E0E0E0' }]}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c9e6e4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flex:1,
    paddingBottom: 100,
    marginBottom:140,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addTodoWrapper: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
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
  addButton: {
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
  addButtonText: {
    fontSize: 24,
  },
});
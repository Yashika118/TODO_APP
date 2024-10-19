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

  useEffect(() => {
    const loadGroupItems = async () => {
      try {
        const storedGroups = await AsyncStorage.getItem('groupItems');
        if (storedGroups) {
          const parsedGroups = JSON.parse(storedGroups);
          setGroupItems(parsedGroups);
          const currentGroup = parsedGroups.find((group: any) => group.id === groupId);
          setTodoList(currentGroup?.todos || []);
        }
      } catch (error) {
        console.error("Failed to load group items:", error);
      }
    };
    loadGroupItems();
  }, [groupId]);

  const saveChanges = async (updatedTodos: string[]) => {
    const updatedGroups = groupItems.map(group =>
      group.id === groupId ? { ...group, todos: updatedTodos } : group
    );
    setGroupItems(updatedGroups);
    await AsyncStorage.setItem('groupItems', JSON.stringify(updatedGroups));
  };

  const handleAddTodo = () => {
    if (todoItem.trim()) {
      const updatedTodos = [...todoList, todoItem];
      setTodoList(updatedTodos);
      saveChanges(updatedTodos);
      setTodoItem('');
    } else {
      Alert.alert("Invalid Input", "Todo cannot be empty.");
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = [...todoList];
    updatedTodos.splice(index, 1);
    setTodoList(updatedTodos);
    saveChanges(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>

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
        contentContainerStyle={{ paddingBottom: 120 }}
      />

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

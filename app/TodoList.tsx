import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Use to retrieve the params

export default function TodoList() {
  // Retrieve parameters passed from index.tsx
  const { groupIndex, groupName, todos } = useLocalSearchParams();

  // Check if `todos` is a string (then parse it), or an array (use it directly)
  const parsedTodos = Array.isArray(todos) ? todos : JSON.parse(todos || '[]');

  const [todoItem, setTodoItem] = useState<string>(''); // For the input of new todos
  const [todoList, setTodoList] = useState<string[]>(parsedTodos); // Parse todos passed as a string or fallback to an empty array

  // Add a new TODO item to the list
  const handleAddTodo = () => {
    if (todoItem.trim()) { // Check for non-empty input
      setTodoList([...todoList, todoItem]);
      setTodoItem(''); // Clear the input field after adding
    }
  };

  // Delete a TODO item from the list
  const handleDeleteTodo = (index: number) => {
    const updatedTodos = [...todoList];
    updatedTodos.splice(index, 1); // Remove the todo at the specified index
    setTodoList(updatedTodos); // Update the state with the new array
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{groupName} Todos</Text>

      {/* Display the list of todos */}
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

      {/* Input field and button to add new todos */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTodoWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a Todo"
          value={todoItem}
          onChangeText={setTodoItem} // Update the state on input change
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

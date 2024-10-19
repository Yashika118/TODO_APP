import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import HomePageHeader from '@/components/HomePageHeader';
import Group from "../components/Group";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function Index() {
  // State to hold the input for the group name
  const [group, setGroup] = useState<string>('');
  
  // State to manage the list of groups, where each group has an ID, name, and todos
  const [groupItems, setGroupItems] = useState<{ id: string, name: string, todos: string[] }[]>([]);
  
  // Router for navigation between screens
  const router = useRouter();

  // useEffect to load groups from AsyncStorage when the component mounts
  useEffect(() => {
    const loadGroupItems = async () => {
      try {
        // Retrieve stored groups from AsyncStorage
        const storedGroups = await AsyncStorage.getItem('groupItems');
        if (storedGroups) {
          // If groups are found, set the state with the parsed data
          setGroupItems(JSON.parse(storedGroups));
        }
      } catch (error) {
        console.error("Failed to load group items:", error);
      }
    };
    loadGroupItems();
  }, []);

  // useEffect to save groupItems to AsyncStorage whenever the groupItems state changes
  useEffect(() => {
    const saveGroupItems = async () => {
      try {
        // Store updated groups in AsyncStorage
        await AsyncStorage.setItem('groupItems', JSON.stringify(groupItems));
      } catch (error) {
        console.error("Failed to save group items:", error);
      }
    };
    saveGroupItems();
  }, [groupItems]);

  // Handle adding a new group
  const handleAddGroup = async () => {
    if (group.trim()) {
      try {
        // Retrieve existing groups from AsyncStorage to ensure the new group is merged correctly
        const storedGroups = await AsyncStorage.getItem('groupItems');
        const existingGroups = storedGroups ? JSON.parse(storedGroups) : [];

        // Create a new group object with a unique ID and empty todos
        const newGroup = { id: uuid.v4() as string, name: group, todos: [] };

        // Update state and AsyncStorage with the new group added to the list
        const updatedGroups = [...existingGroups, newGroup];
        setGroupItems(updatedGroups);
        await AsyncStorage.setItem('groupItems', JSON.stringify(updatedGroups));

        // Clear the input field
        setGroup('');
      } catch (error) {
        console.error("Failed to add new group:", error);
      }
    } else {
      Alert.alert("Invalid Input", "Group name cannot be empty.");
    }
  };

  // Handle deleting a group
  const handleDeleteGroup = (id: string) => {
    // Filter out the group with the specified ID and update state
    const updatedGroups = groupItems.filter(group => group.id !== id);
    setGroupItems(updatedGroups);
  };

  // Handle updating a group's name
  const handleUpdateGroup = (index: number, newName: string) => {
    if (newName.trim()) {
      // Create a copy of groupItems and update the group name at the specified index
      const updatedGroups = [...groupItems];
      updatedGroups[index].name = newName;
      setGroupItems(updatedGroups);
    } else {
      Alert.alert("Invalid Input", "Group name cannot be empty.");
    }
  };

  // Navigate to the TodoList page for the specified group
  const handleTodoPage = (groupId: string) => {
    router.push({
      pathname: '/TodoList',
      params: { groupIndex: groupId },
    });
  };

  return (
    // Dismiss the keyboard when the user taps outside of the input field
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Render the header of the home page */}
        <HomePageHeader />

        {/* Use FlatList to make it scrollable */}
        <FlatList
          data={groupItems}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} onPress={() => handleTodoPage(item.id)}>
              <Group
                title={item.name}
                todoCount={item.todos.length}
                onDelete={() => handleDeleteGroup(item.id)}
                onEdit={(newName) => handleUpdateGroup(groupItems.findIndex(g => g.id === item.id), newName)}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />

        {/* Input field for adding a new group */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeGroupWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Write a Group"
            value={group}
            onChangeText={setGroup}
          />
          <TouchableOpacity onPress={handleAddGroup} disabled={!group.trim()}>
            <View style={[styles.addWrapper, !group.trim() && { backgroundColor: '#E0E0E0' }]}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9e6e4',
  },
  listContainer: {
    paddingBottom: 120,  
  },
  writeGroupWrapper: {
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

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import HomePageHeader from '@/components/HomePageHeader';
import Group from "../components/Group";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function Index() {
  const [group, setGroup] = useState<string>('');
  const [groupItems, setGroupItems] = useState<{ id: string, name: string, todos: string[] }[]>([]);
  const router = useRouter();

  // Load groupItems from AsyncStorage on component mount
  useEffect(() => {
    const loadGroupItems = async () => {
      try {
        const storedGroups = await AsyncStorage.getItem('groupItems');
        if (storedGroups) {
          setGroupItems(JSON.parse(storedGroups));
        }
      } catch (error) {
        console.error("Failed to load group items:", error);
      }
    };
    loadGroupItems();
  }, []);

  // Save groupItems to AsyncStorage whenever it changes
  useEffect(() => {
    const saveGroupItems = async () => {
      try {
        await AsyncStorage.setItem('groupItems', JSON.stringify(groupItems));
      } catch (error) {
        console.error("Failed to save group items:", error);
      }
    };
    saveGroupItems();
  }, [groupItems]);

  const handleAddGroup = async () => {
    if (group.trim()) {
      try {
        // Load existing groups from AsyncStorage to ensure merging
        const storedGroups = await AsyncStorage.getItem('groupItems');
        const existingGroups = storedGroups ? JSON.parse(storedGroups) : [];

        // Create a new group with a unique ID
        const newGroup = { id: uuid.v4() as string, name: group, todos: [] };

        // Update both state and AsyncStorage with the new group merged with existing groups
        const updatedGroups = [...existingGroups, newGroup];
        setGroupItems(updatedGroups);
        await AsyncStorage.setItem('groupItems', JSON.stringify(updatedGroups));

        // Clear input
        setGroup('');
      } catch (error) {
        console.error("Failed to add new group:", error);
      }
    } else {
      Alert.alert("Invalid Input", "Group name cannot be empty.");
    }
  };

  const handleDeleteGroup = (id: string) => {
    const updatedGroups = groupItems.filter(group => group.id !== id);
    setGroupItems(updatedGroups);
  };

  const handleUpdateGroup = (index: number, newName: string) => {
    if (newName.trim()) {
      const updatedGroups = [...groupItems];
      updatedGroups[index].name = newName;
      setGroupItems(updatedGroups);
    } else {
      Alert.alert("Invalid Input", "Group name cannot be empty.");
    }
  };

  const handleTodoPage = (groupId: string) => {
    router.push({
      pathname: '/TodoList',
      params: { groupIndex: groupId },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <HomePageHeader />

        {/* Use FlatList to render the group list and make it scrollable */}
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
    paddingBottom: 120,  // Add padding at the bottom to prevent overlap
  },
  writeGroupWrapper: {
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

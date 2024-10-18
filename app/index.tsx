import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity } from 'react-native';
import HomePageHeader from '@/components/HomePageHeader';
import Group from "../components/Group";
import { Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [group, setGroup] = useState<string>('');
  const [groupItems, setGroupItems] = useState<{ name: string, todos: string[] }[]>([]);
  const router = useRouter();

  // Load groupItems from AsyncStorage on component mount
  useEffect(() => {
    const loadGroupItems = async () => {
      const storedGroups = await AsyncStorage.getItem('groupItems');
      if (storedGroups) {
        setGroupItems(JSON.parse(storedGroups));
      }
    };
    loadGroupItems();
  }, []);

  // Save groupItems to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('groupItems', JSON.stringify(groupItems));
  }, [groupItems]);

  const handleAddGroup = () => {
    if (group.trim()) {
      // Preserve existing groups and add a new group
      const updatedGroups = [...groupItems, { name: group, todos: [] }];
      setGroupItems(updatedGroups); // Update state with new group
      setGroup(''); // Clear input
    }
  };

  const handleDeleteGroup = (index: number) => {
    const updatedGroups = [...groupItems];
    updatedGroups.splice(index, 1); // Remove the selected group
    setGroupItems(updatedGroups); // Update state
  };

  const handleUpdateGroup = (index: number, newName: string) => {
    const updatedGroups = [...groupItems];
    updatedGroups[index].name = newName; // Update group name
    setGroupItems(updatedGroups); // Update state
  };

  const handleTodoPage = (index: number) => {
    router.push({
      pathname: '/TodoList',
      params: {
        groupIndex: index.toString(),
        groupName: groupItems[index].name,
      },
    });
  };

  return (
    <View style={styles.container}>
      <HomePageHeader />

      <View style={styles.groupContainer}>
        {groupItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleTodoPage(index)}>
            <Group
              title={item.name}
              onDelete={() => handleDeleteGroup(index)}
              onEdit={(newName) => handleUpdateGroup(index, newName)}
            />
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeGroupWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a Group"
          value={group}
          onChangeText={setGroup}
        />
        <TouchableOpacity onPress={handleAddGroup}>
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
    backgroundColor: '#c9e6e4',
  },
  groupContainer: {
    flex: 1,
    margin: 20,
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

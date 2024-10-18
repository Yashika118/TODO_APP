import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity } from 'react-native';
import HomePageHeader from '@/components/HomePageHeader';
import Group from "../components/Group";
import { Keyboard } from 'react-native';
import { Linking } from "react-native";
import { Redirect, useUnstableGlobalHref } from 'expo-router';
import { useRouter } from 'expo-router';

import { LogBox } from 'react-native';


LogBox.ignoreAllLogs(true);
const router = useRouter();


export default function Index() {

  const [group, setGroup] = useState<string>('');
  const [groupItems, setGroupItems] = useState<{ name: string, todos: string[] }[]>([]);

  const handleAddGroup = () => {
    Keyboard.dismiss();
    if (group) {
      setGroupItems([...groupItems, { name: group, todos: [] }]); // Add new group with an empty todos array
      setGroup(''); // Clear input field
    }
  };

  // Delete a group
  const handleDeleteGroup = (index: number) => {
    const updatedGroups = [...groupItems];
    updatedGroups.splice(index, 1); // Remove group from the list
    setGroupItems(updatedGroups); // Update state
  };

  // Update the group name
  const handleUpdateGroup = (index: number, newName: string) => {
    const updatedGroups = [...groupItems];
    updatedGroups[index].name = newName; // Update group name
    setGroupItems(updatedGroups); // Update state
  };

  const handleTodoPage = (index: number) => {
    const selectedGroup = groupItems[index];

    router.push({
      pathname: '/TodoList',
      params: {
        groupIndex: index,
        groupName: selectedGroup.name,
        todos: JSON.stringify(selectedGroup.todos) // Convert the todos array to a string
      }
    });
  };

  return (
    <View style={styles.container} >
      
      <HomePageHeader />

      <View style={styles.groupContainer}>
        
        {/* Render the GroupItem list */}
        
        {groupItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            // onPress={() => navigation.navigate('GroupTodoScreen', { groupIndex: index, todos: item.todos, groupName: item.name })} // Pass group index and todos to GroupTodoScreen
            onPress={() => {handleTodoPage(index)}}
          >
            <Group
              title={item.name}
              onDelete={() => handleDeleteGroup(index)}
              onEdit={(newName) => handleUpdateGroup(index, newName)}
            />
          </TouchableOpacity>
        ))}

      </View>

        {/* write a group or add another group */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeGroupWrapper}
        >
          <TextInput 
            style={styles.input} 
            placeholder={'Write a Group'} 
            value={group} 
            onChangeText={text => setGroup(text)} 
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
    // backgroundColor:"yellow",
  },
  writeGroupWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
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
  addText: {},
});

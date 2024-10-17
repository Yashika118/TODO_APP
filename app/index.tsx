import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity } from 'react-native';
import HomePageHeader from '@/components/HomePageHeader';
import Group from "../components/Group";
import { Keyboard } from 'react-native';

export default function Index() {

  const [group, setGroup] = useState<string>('');
  const [groupItem, setGroupItem] = useState<string[]>([]);

  const handleAddGroup = () => {
    Keyboard.dismiss();
    
    if (group) {
      setGroupItem([...groupItem, group]);
      setGroup(''); // Reset Group to empty string after adding
    }
    console.log(groupItem);
  };

  const handleDeleteGroup = (index: number) => {
    const updatedGroups = [...groupItem];
    updatedGroups.splice(index, 1); // Remove the group at the specified index
    setGroupItem(updatedGroups); // Update the state with the new array
  };

  const handleUpdateGroup = (index:number,newName:string)=>{
    const updateGroups=[...groupItem];
    updateGroups[index]=newName;
    setGroupItem(updateGroups);    
  }

  return (
    <View style={styles.container} >
      
      <HomePageHeader />

      <View style={styles.groupContainer}>
        
        {/* Render the GroupItem list */}
        
        {groupItem.map((item, index) => {
          return (
            <Group key={index} title={item} onDelete={()=>handleDeleteGroup(index)} onEdit={(newName)=> handleUpdateGroup(index,newName)} />
          );
        })}

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

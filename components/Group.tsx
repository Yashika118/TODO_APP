import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    title: string;
    onDelete: () => void;
    onEdit: (newName: string) => void;
};

export default function Group({ title, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);  // Toggle for edit mode
  const [newTitle, setNewTitle] = useState(title);  // The updated title

  const handleSave = () => {
    onEdit(newTitle);  // Save the new title
    setIsEditing(false);  // Exit edit mode
  };

  return (
    <View style={styles.taskCard}>
      {/* If editing, show a text input with focus to edit the group name */}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={handleSave}  // Save the name when Enter is pressed
          autoFocus  // This will trigger the keyboard to pop up
        />
      ) : (
        <View style={styles.taskCardText}>
          <Text style={styles.taskTitle}>{title}</Text>
        </View>
      )}

      <View style={styles.iconContainer}>
        {/* Toggle edit mode when the edit button is pressed */}
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <MaterialIcons name="edit" size={25} color="#25292e" />
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity onPress={onDelete}>
          <MaterialIcons name="delete" size={25} color="#25292e" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskCardText: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

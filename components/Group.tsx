import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  title: string;
  todoCount: number;
  onDelete: () => void;
  onEdit: (newName: string) => void;
};

export default function Group({ title, todoCount, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = () => {
    onEdit(newTitle);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Group",
      `Are you sure you want to delete the group "${title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Delete", onPress: onDelete },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskCard}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            onSubmitEditing={handleSave}
            autoFocus
          />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.taskTitle}>{title}</Text>
            {/* <Text style={styles.todoCountText}>Todos: {todoCount}</Text> */}
          </View>
        )}

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setIsEditing(true)} disabled={isEditing}>
            <MaterialIcons name="edit" size={25} color={isEditing ? "#E0E0E0" : "#25292e"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmDelete}>
            <MaterialIcons name="delete" size={25} color="#25292e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',  // Make the container take up 90% of the screen width
    alignSelf: 'center',  // Center the container
    marginVertical: 5,  // Add vertical spacing between components
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  todoCountText: {
    fontSize: 14,
    color: '#555',
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

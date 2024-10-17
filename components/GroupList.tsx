import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function GroupList(){
    const TaskGroups = [
        { id: '1', title: 'Website for Rune.io', tasks: '12 Tasks', progress: 0.4 },
        { id: '2', title: 'Dashboard for ProSavvy', tasks: '12 Tasks', progress: 0.75 },
        { id: '3', title: 'Mobile Apps for Track.id', tasks: '12 Tasks', progress: 0.5 },
        { id: '4', title: 'Website for CourierGo.com', tasks: '12 Tasks', progress: 0.4 },
      ];
    
    
    
      type ItemProps = { id: string, title: string, tasks: string, progress: number };
    
      const renderTaskItem = ({ item }: { item: ItemProps }) => (
        <View style={styles.taskCard}>
          <View style={styles.taskCardText}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDetails}>{item.tasks}</Text>
          </View>
         
        </View>
      );

      return(
        <FlatList
          data={TaskGroups}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          style={styles.recentTaskList}
        />
      );
    
}

const styles = StyleSheet.create({
    
    recentTaskList: {
      marginBottom: 20,
    },
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
    
    taskDetails: {
      fontSize: 12,
      color: 'gray',
    },
    
    
  });
  
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type Props={
    title:string;
};

export default function Group({ title }: Props) {
    return(
        <View style={styles.taskCard}>
            <View style={styles.taskCardText}>
                <Text style={styles.taskTitle}>{title}</Text>
                <Text style={styles.taskDetails}>0</Text>
            </View>

            <View style={styles.iconContainer}>
                <View>
                    <MaterialIcons name="edit" size={25} color="#25292e" />
                </View>
                <View>
                    <MaterialIcons name="delete" size={25} color="#25292e" />
                </View>
            </View>

        </View>
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

    iconContainer:{
        flexDirection:"row",
    }
    // iconButton:
    
  });
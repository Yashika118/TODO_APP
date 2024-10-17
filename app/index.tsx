import React from 'react';
import { StyleSheet, Text, View,FlatList} from 'react-native';
import HomePageHeader from '@/components/HomePageHeader';


export default function Index() {

  const TaskGroups = [
    { id: '1', title: 'Website for Rune.io',  tasks: '12 Tasks', progress: 0.4 },
    { id: '2', title: 'Dashboard for ProSavvy',  tasks: '12 Tasks', progress: 0.75 },
    { id: '3', title: 'Mobile Apps for Track.id',  tasks: '12 Tasks', progress: 0.5 },
    { id: '4', title: 'Website for CourierGo.com', tasks: '12 Tasks', progress: 0.4 },
  ];
 

  return (
    <View style={styles.container} >
      <HomePageHeader/>
      <View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9e6e4',
  
  },
  text: {
    color: 'white',
  },

  

});

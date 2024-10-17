import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import HomePageHeader from '@/components/HomePageHeader';
import GroupList from "../components/GroupList";

export default function Index() {

  return (
    <View style={styles.container} >
      <HomePageHeader />

      
      <View>
        <GroupList/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9e6e4',

  },
});

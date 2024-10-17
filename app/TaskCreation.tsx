import { Text, View, StyleSheet } from 'react-native';

export default function TaskCreation() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TaskCreation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9e6e4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

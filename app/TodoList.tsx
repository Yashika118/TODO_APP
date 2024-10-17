import { Text, View, StyleSheet } from 'react-native';

export default function TodoListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TodoList screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#64015b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

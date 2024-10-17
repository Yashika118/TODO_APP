import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container} >
      <Text style={styles.text}>Home screen.</Text>
      <Link href="./TodoList" style={styles.text}> TodoList Screen.</Link>
      <Link href="./TaskDetail" style={styles.text}>TaskDetail Screen</Link>
      <Link href="./TaskCreation" style={styles.text}>TaskCreation Screen</Link>
      <Link href="./Task345Creation" style={styles.text}>NotFound Screen</Link>
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#64015b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

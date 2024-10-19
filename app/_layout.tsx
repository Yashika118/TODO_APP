import { Stack } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";



export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle:"Home" ,headerShown:false}}/>
      <Stack.Screen name="TodoList" options={{headerTitle:"TodoList"}}/>
      <Stack.Screen name="+not-found" options={{headerTitle:"Oops ! Not Found", headerBackVisible:false}}/>
    </Stack>

  );
}

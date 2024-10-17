import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerTitle:"Home" ,headerShown:false}}/>
      <Stack.Screen name="TodoList" options={{headerTitle:"TodoList"}}/>
      <Stack.Screen name="TaskDetail" options={{headerTitle:"TaskDetail"}}/>
      <Stack.Screen name="TaskCreation" options={{headerTitle:"TaskCreation"}}/>
      <Stack.Screen name="+not-found" options={{headerTitle:"Oops ! Not Found", headerBackVisible:false}}/>
    </Stack>
  );
}

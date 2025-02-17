import GlobalContext from "@/contexts/GlobalContext";
import { Stack } from "expo-router";

import '../global.css'
import { SafeAreaView, StatusBar, View } from "react-native";

//import { Courgette_400Regular } from "@expo-google-fonts/courgette";

export default function index() {
  return (
    <GlobalContext>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content"  />
        <View className="h-full w-full" style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login"/>
            <Stack.Screen name='Home'/>
          </Stack>
        </View>
      </SafeAreaView>
    </GlobalContext>
  );
}

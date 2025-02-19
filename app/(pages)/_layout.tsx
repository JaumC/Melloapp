import GlobalContext from "@/contexts/GlobalContext";
import { Stack } from "expo-router";

import '../../global.css';

import { SafeAreaView, StatusBar, View } from "react-native";

export default function RootLayout() {
  
  return (
    <GlobalContext>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fafafa" barStyle="dark-content"/>
        <View className="h-full w-full" style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login"/>
            <Stack.Screen name='Home'/>
            <Stack.Screen name='Cadastro'/>
            <Stack.Screen name='RecuperarSenha'/>
          </Stack>
        </View>
      </SafeAreaView>
    </GlobalContext>
  );
}

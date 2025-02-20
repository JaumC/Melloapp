import GlobalContext from "@/contexts/GlobalContext";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';

import '../../global.css';

import { SafeAreaView, View } from "react-native";

export default function RootLayout() {
  
  return (
    <GlobalContext>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="h-full w-full" style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home'/>
            <Stack.Screen name="index" />
            <Stack.Screen name='Cadastro'/>
            <Stack.Screen name='RecuperarSenha'/>
          </Stack>
          <Toast/>
        </View>
      </SafeAreaView>
    </GlobalContext>
  );
}

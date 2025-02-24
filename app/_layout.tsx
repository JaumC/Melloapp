import GlobalContext from "@/app/contexts/GlobalContext";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';
import '../global.css';

import { SafeAreaView, View } from "react-native";

export default function Layout() {

  return (
    <GlobalContext>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="h-full w-full" style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="cadastro"
              options={{
                headerStyle: {
                  backgroundColor: '#C4A59D',
                },
                headerTintColor: '#fafafa',

                headerTitle: '',
              }}/>
            <Stack.Screen name="(drawer)" options={{ headerShown: false, headerTitle: '' }} />
            <Stack.Screen name="recuperarSenha" />
          </Stack>
          <Toast />
        </View>
      </SafeAreaView>
    </GlobalContext>

  );
}
import Toast from 'react-native-toast-message';
import { Stack } from "expo-router";
import '../global.css';

import { SafeAreaView, View } from "react-native";
import Loading from "@/utils/Loading";
import GlobalContext from '@/contexts/GlobalContext'

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
              }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false, headerTitle: '' }} />
            <Stack.Screen name="(stack)" options={{ headerShown: false, headerTitle: '' }} />
            <Stack.Screen name="recuperarSenha" />
          </Stack>
          <Toast />
          <Loading />
        </View>
      </SafeAreaView>
    </GlobalContext>

  );
}
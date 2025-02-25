import GlobalContext from "@/app/contexts/GlobalContext";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';
import '../global.css';

import { CormorantSC_400Regular } from '@expo-google-fonts/cormorant-sc'; 
import { Roboto_100Thin } from '@expo-google-fonts/roboto'; 

import { SafeAreaView, View } from "react-native";
import { useFonts } from "expo-font";

export default function Layout() {

    useFonts({
      CormorantSC_400Regular,
      Roboto_100Thin,
    });

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
            <Stack.Screen name="(stack)" options={{ headerShown: false, headerTitle: '' }} />
            <Stack.Screen name="recuperarSenha" />
          </Stack>
          <Toast />
        </View>
      </SafeAreaView>
    </GlobalContext>

  );
}
import GlobalContext from "@/app/contexts/GlobalContext";
import Toast from 'react-native-toast-message';
import { Stack } from "expo-router";
import '../global.css';

import { userHook } from "./contexts/UserProvider";
import { SafeAreaView, View } from "react-native";
import Loading from "@/app/utils/Loading";

export default function Layout() {

  const { loading } = userHook()

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
          <Toast/>
          {loading && <Loading />}
        </View>
      </SafeAreaView>
    </GlobalContext>

  );
}
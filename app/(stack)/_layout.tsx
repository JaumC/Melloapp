import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Stack } from "expo-router";

export default function Layout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#fafafa' }, headerShadowVisible: false }}>
        <Stack.Screen name="perfil" options={{ headerTitle: '' }} />
        <Stack.Screen name="editPerfil" options={{ headerTitle: '' }} />
      </Stack>
    </GestureHandlerRootView>


  );
}
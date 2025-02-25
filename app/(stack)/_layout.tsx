import { Stack } from "expo-router";

export default function Layout() {

  return (
        <Stack screenOptions={{ headerStyle: { backgroundColor: '#fafafa'}, headerShadowVisible: false }}>
            <Stack.Screen name="perfil" options={{ headerTitle: '' }} />
            <Stack.Screen name="editPerfil" options={{ headerTitle: '' }} />
        </Stack>

  );
}
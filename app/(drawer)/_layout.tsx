import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import * as React from 'react';
import CustomDrawer from "@/app/components/Drawer/CustomDrawer";
import ProfileButton from '@/app/components/Buttons/ProfileButton';
import { useRouter } from 'expo-router';

export default function Layout() {

    const router = useRouter()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#C4A59D',
                    },
                    headerTintColor: '#fafafa',
                    headerRight: () => (
                        <ProfileButton
                            w={45}
                            h={45}
                            onPress={() => router.push('../(tabs)/perfil')} 
                        />
                    ),
                }}
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name="(drawer)/index" />
            </Drawer>
        </GestureHandlerRootView>
    );
}

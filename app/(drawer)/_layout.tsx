import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import * as React from 'react';
import CustomDrawer from "@/app/components/Drawer/CustomDrawer";
import ProfileButton from '@/app/components/Buttons/ProfileButton';
import Spacer from '@/app/components/Spacer/Spacer';
import { useRouter } from 'expo-router';
import { useSession } from '@/app/contexts/UserProvider';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { API_URL } from '../utils/API_URL';

export default function Layout() {

    const router = useRouter()
    const { user } = useSession()

    const [profilePic, setProfilePic] = useState<string>("");

    const imageUser = async() => {
        if (user && user.profilePic) {
            const imageUrl = `${API_URL}/user/photo/${user.id}`;
            setProfilePic(imageUrl);
        }
    };
    
    useEffect(() => {
        imageUser();
    }, [profilePic]);

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
                        <>
                            <ProfileButton profilePic={profilePic} w={45} h={45} onPress={() => router.push('/(stack)/perfil')}/>
                            <Spacer w={20}/>
                        </>
                    ),
                }}
                drawerContent={(props) => <CustomDrawer {...props} />}>
                <Drawer.Screen name="home"/>
                <Drawer.Screen name="cadastrarDesafio"/>
                <Drawer.Screen name="adcionarCompetidor"/>
                <Drawer.Screen name="meusAmigos"/>
                <Drawer.Screen name="historicoDesafio"/>
            </Drawer>
        </GestureHandlerRootView>
    );
}

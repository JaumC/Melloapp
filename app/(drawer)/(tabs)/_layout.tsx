import { Tabs } from 'expo-router';
import * as React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

export default function Layout() {

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#A3BBA3', headerShown: false }}>
            <Tabs.Screen 
            name="cadastrarDesafio"  
            options={{
                title: 'Desafio',
                tabBarIcon: ({ color }) => <FontAwesome6 name="trophy" size={20} color={color} />,
            }}/>
            <Tabs.Screen 
            name="adcionarCompetidor"
            options={{
                title: 'Competidor',
                tabBarIcon: ({ color })  => <FontAwesome6 name="handshake-simple" size={20} color={color} />,
            }}/>
            <Tabs.Screen 
            name="meusAmigos"
            options={{
                title: 'Meus Amigos',
                tabBarIcon: ({ color }) => <FontAwesome5 name="users" size={20} color={color} />
            }}/>
            <Tabs.Screen 
            name="historicoDesafio"
            options={{
                title: 'Histórico',
                tabBarIcon: ({ color }) => <Feather name="clock" size={20} color={color} />
            }}/>
        </Tabs>
    );
}

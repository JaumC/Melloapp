import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useContext } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "@/contexts/Providers/UserProvider";
import SmallButton from "@/app/components/Buttons/SmallButton";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function CustomDrawer(props: any) {

    const router = useRouter()
    const { logout }: any = useContext(UserContext)

  return (
    <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginRight: -12,
          marginLeft: -12,
        }}
        style={{
          marginTop: -12,
          marginBottom: -12,
          padding: 0,
        }}>
            <View className="flex flex-col justify-between">
                <ScrollView showsVerticalScrollIndicator={false}>
                <DrawerItem
                label="CADASTRAR DESAFIO"
                onPress={() => router.push("/")}
                />
                <DrawerItem
                label="ADCIONAR COMPETIDOR"
                onPress={() => router.push("/")}
                />
                <DrawerItem
                label="MEUS AMIGOS"
                onPress={() => router.push("/")}
                />
                <DrawerItem
                label="HISTÓRICO DE DESAFIOS"
                onPress={() => router.push("/")}
                />
                <View className="bg-[#D9D9D9] flex flex-row justify-between h-[60px] items-center">
                    <View className="ml-[20px]">
                        <SmallButton state={false} onPress={() => router.push('/(drawer)')} icon={<FontAwesome6 name="house-chimney" size={20} color="black" />}/>
                    </View>
                    <View className="mr-[20px]">
                        <SmallButton state={true} onPress={() => logout()} icon={<FontAwesome5 name="sign-out-alt" size={20} color="black" />}/>
                    </View>
                </View>
          </ScrollView>
            </View>
    </DrawerContentScrollView>
    );
}

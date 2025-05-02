import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import SmallButton from "@/components/Buttons/SmallButton";
import ProfileButton from "@/components/Buttons/ProfileButton";
import Spacer from '@/components/Spacer/Spacer';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

import { useCallback, useState } from "react";
import { API_URL } from "@/utils/API_URL";
import { userHook } from "@/contexts/Providers/UserProvider";
import { getTextColor } from "@/utils/TextColor";

export default function CustomDrawer(props: any) {

  const router = useRouter()
  const { logoutUser, user } = userHook()

  const [nick, setNick] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [searchId, setSearchId] = useState<string>('')
  const [profilePic, setProfilePic] = useState<string>('')

  const textColor = getTextColor(user?.color || '#000000')

  useFocusEffect(
    useCallback(() => {
      setNick(user?.nickname || '');
      setEmail(user?.email || '');
      setSearchId(user?.search_id || '');

      if (user?.profilePic) {
        setProfilePic(
          `${API_URL}/user/photo/${user?.id}?timestamp=${new Date().getTime()}`
        );
      }
    }, [])
  );

  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        marginRight: -12,
        marginLeft: -12,
        flex: 1,
      }}
      style={{
        marginTop: -12,
        marginBottom: -12,
        padding: 0,
      }}>
      <View className="flex justify-between h-[100%]">
        <View>
          <View style={{ backgroundColor: user?.color}} className="h-[150px] flex-row items-center justify-evenly w-full">
            <ProfileButton profilePic={profilePic} w={71} h={71} onPress={() => router.push('/perfil')} />
            <View>
              <Text style={{ color: textColor}} className="font-cormorantSC text-[24px]">{nick.toUpperCase()}</Text>
              <Text style={{ color: textColor}} className="font-robotoThin font-[700]">{email}</Text>
              <Text style={{ color: textColor}} className="font-robotoThin font-[700]">ID: {searchId}</Text>
            </View>
          </View>
          <Spacer h={20} />

          <DrawerItem
            label="CADASTRAR DESAFIO"
            onPress={() => router.push("/cadastrarDesafio")}
            icon={() => <FontAwesome6 name="trophy" size={20} color="#424040" />}
            style={{ borderRadius: 0 }}
          />

          <DrawerItem
            label="ADCIONAR COMPETIDOR"
            onPress={() => router.push("/adicionarCompetidor")}
            icon={() => <FontAwesome6 name="handshake-simple" size={20} color="#424040" />}
            style={{ borderRadius: 0 }}
          />

          <DrawerItem
            label="MEUS AMIGOS"
            onPress={() => router.push("/meusAmigos")}
            icon={() => <FontAwesome5 name="users" size={20} color="#424040" />}
            style={{ borderRadius: 0 }}
          />

          <DrawerItem
            label="HISTÓRICO DE DESAFIOS"
            onPress={() => router.push("/historicoDesafio")}
            icon={() => <Feather name="clock" size={20} color="#424040" />}
            style={{ borderRadius: 0 }}
          />
        </View>

        <View className="bg-[#D9D9D9] flex flex-row justify-between h-[60px] items-center ">
          <View className="ml-[20px]">
            <SmallButton onPress={() => router.push('/home')} icon={<FontAwesome6 name="house-chimney" size={20} color="black" />} />
          </View>
          <View className="mr-[20px]">
            <SmallButton onPress={logoutUser} icon={<FontAwesome5 name="sign-out-alt" size={20} color="black" />} />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

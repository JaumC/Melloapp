import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/app/contexts/UserProvider";
import SmallButton from "@/app/components/Buttons/SmallButton";
import ProfileButton from "@/app/components/Buttons/ProfileButton";
import Spacer from '@/app/components/Spacer/Spacer';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

import { useFonts } from 'expo-font';
import { CormorantSC_400Regular } from '@expo-google-fonts/cormorant-sc'; 
import { Roboto_100Thin } from '@expo-google-fonts/roboto'; 
import { useEffect, useState } from "react";
import { API_URL } from "@/app/utils/API_URL";

export default function CustomDrawer(props: any) {

    const router = useRouter()
    const { logoutUser, readUser, user } = useSession()

    const [ nick, setNick ] = useState('')
    const [ profilePic, setProfilePic ] = useState('')
    const [ email, setEmail ] = useState('')

    const handleUserInfos = async() => {
      const userInfos: any = await readUser()

      setNick(userInfos.nickname)
      setEmail(userInfos.email)
    }

    const imageUser = async() => {
        if (user && user.profilePic) {
            const imageUrl = `${API_URL}/user/photo/${user.id}`;
            setProfilePic(imageUrl);
        }
    };

    useFonts({
      CormorantSC_400Regular,
      Roboto_100Thin,
    });

    useEffect(() => {
      handleUserInfos()
    }, [nick, email])

    useEffect(() => {
        imageUser();
    }, [profilePic]);

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
                <View className="bg-[#C4A59D] h-[150px] flex-row items-center justify-evenly w-full">
                  <ProfileButton profilePic={profilePic} w={71} h={71} onPress={() => router.push('/perfil')}/>
                    <View>
                        <Text className="font-cormorantSC text-[24px]">{nick.toUpperCase()}</Text>
                        <Text className="font-robotoThin color-[#424040] font-[700]">{email}</Text>
                    </View>
                </View>
                <Spacer h={20}/>

                <DrawerItem
                label="CADASTRAR DESAFIO"
                onPress={() => router.push("/cadastrarDesafio")}
                icon={() => <FontAwesome6 name="trophy" size={20} color="#424040" />}
                style={{borderRadius: 0}}
                />

                <DrawerItem
                label="ADCIONAR COMPETIDOR"
                onPress={() => router.push("/adcionarCompetidor")}
                icon={() => <FontAwesome6 name="handshake-simple" size={20} color="#424040" />}
                style={{borderRadius: 0}}
                />

                <DrawerItem
                label="MEUS AMIGOS"
                onPress={() => router.push("/meusAmigos")}
                icon={() => <FontAwesome5 name="users" size={20} color="#424040" />}
                style={{borderRadius: 0}}
                />

                <DrawerItem
                label="HISTÓRICO DE DESAFIOS"
                onPress={() => router.push("/historicoDesafio")}
                icon={() => <Feather name="clock" size={20} color="#424040" />}
                style={{borderRadius: 0}}
                />
              </View>

              <View className="bg-[#D9D9D9] flex flex-row justify-between h-[60px] items-center ">
                  <View className="ml-[20px]">
                      <SmallButton press={false} onPress={() => router.push('/home')} icon={<FontAwesome6 name="house-chimney" size={20} color="black" />}/>
                  </View>
                  <View className="mr-[20px]">
                      <SmallButton press={true} onPress={logoutUser} icon={<FontAwesome5 name="sign-out-alt" size={20} color="black" />}/>
                  </View>
              </View>
        </View>
    </DrawerContentScrollView>
    );
}

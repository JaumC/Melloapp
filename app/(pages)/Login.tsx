import { CormorantSC_400Regular } from '@expo-google-fonts/cormorant-sc'; 

import { UserContext } from '@/contexts/Providers/UserProvider';
import Input from '@/app/components/Input/Input';

import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { useFonts } from 'expo-font';

import Spacer from '@/app/components/Spacer/Spacer';
import Button from '@/app/components/Button/Button';

export default function Login() {
  const { }: any = useContext(UserContext);

  const router = useRouter();
  
  const [fontsLoaded] = useFonts({
    CormorantSC_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>; 
  }

  return (
    <View className='flex items-center h-full w-full bg-[#fafafa]'>
      <Spacer h={80}/>
      <Text className='font-cormorantSC text-[72px]'>MELLO</Text>
      <Spacer h={80}/>
      <Input text='EMAIL' upper={false} placeholder='Digite seu email'/>
      <View>
        <Spacer h={18}/>
        <Input text='SENHA' upper={false} pass={true} placeholder='Digite sua senha'/>
        <TouchableOpacity className='flex items-end justify-center' onPress={() => router.push('/Home')}>
          <Spacer h={9}/>
          <Text className='font-robotoThin color-[#004C72]'>Esqueci minha senha</Text>
        </TouchableOpacity>
        <Spacer h={50}/>
        <Button text='LOGAR' onPress={() => router.push('/RecuperarSenha')}/>
        <TouchableOpacity className='flex items-center justify-center' onPress={() => router.push('/Home')}>
          <Spacer h={9}/>
          <Text className='font-robotoThin color-[#004C72]'>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
}

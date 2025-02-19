import { UserContext } from '@/contexts/Providers/UserProvider';

import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';

import Input from '@/app/(components)/Input/Input';
import Spacer from '@/app/(components)/Spacer/Spacer';
import Button from '@/app/(components)/ActionButton/ActionButton';

export default function Login() {
  const { login }: any = useContext(UserContext);

  const handleLogin = async() => {
    await login()
  }

  const router = useRouter();

  return (
    <View className='flex items-center h-full w-full bg-[#fafafa]'>
      <Spacer h={80}/>
      <Text className='font-cormorantSC text-[72px]'>MELLO</Text>
      <Spacer h={80}/>
      <Input text='EMAIL' upper={false} placeholder='Digite seu email'/>
      <View>
        <Spacer h={18}/>
        <Input text='SENHA' upper={false} pass={true} placeholder='Digite sua senha'/>
        <TouchableOpacity className='flex items-end justify-center' onPress={() => router.push('/RecuperarSenha')}>
          <Spacer h={9}/>
          <Text className='font-robotoThin color-[#004C72]'>Esqueci minha senha</Text>
        </TouchableOpacity>
        <Spacer h={50}/>
        <Button text='LOGAR' onPress={() => handleLogin()}/>
        <TouchableOpacity className='flex items-center justify-center' onPress={() => router.push('/Cadastro')}>
          <Spacer h={9}/>
          <Text className='font-robotoThin color-[#004C72]'>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
}

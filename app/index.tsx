
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import ActionButton from '@/components/Buttons/ActionButton';
import { userHook } from '@/contexts/Providers/UserProvider';

export default function Login() {
  const { loginUser } = userHook();

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const router = useRouter();

  const handleLogin = async () => {
    await loginUser(email, senha)
  }

  return (
    <View className='flex items-center h-full w-full bg-[#fafafa]'>
      <StatusBar backgroundColor='#fafafa' barStyle="dark-content" />
      <Spacer h={80} />
      <Text className='font-cormorantSC text-[70px]'>MELLO</Text>
      <Spacer h={80} />
      <Input value={email} onChangeText={setEmail} text='EMAIL' upper={false} placeholder='Digite seu email' />
      <View>
        <Spacer h={18} />
        <Input value={senha} onChangeText={setSenha} text='SENHA' upper={false} pass={true} placeholder='Digite sua senha' />
        <TouchableOpacity className='flex items-end justify-center' onPress={() => router.push('/recuperarSenha')}>
          <Spacer h={9} />
          <Text className='font-robotoThin color-[#004C72]'>Esqueci minha senha</Text>
        </TouchableOpacity>
        <Spacer h={50} />
        <ActionButton text='LOGAR' onPress={() => handleLogin()} />
        <TouchableOpacity className='flex items-center justify-center' onPress={() => router.push('/cadastro')}>
          <Spacer h={9} />
          <Text className='font-robotoThin color-[#004C72]'>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

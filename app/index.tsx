import { useSession } from "@/app/contexts/UserProvider";

import { CormorantSC_400Regular } from '@expo-google-fonts/cormorant-sc'; 
import { Roboto_100Thin } from '@expo-google-fonts/roboto'; 
import { useFonts } from 'expo-font';

import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import Input from '@/app/components/Input/Input';
import Spacer from '@/app/components/Spacer/Spacer';
import Loading from '@/app/components/Loading/Loading';
import Button from '@/app/components/Buttons/ActionButton';


export default function Login() {
  const { loginUser } = useSession();

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  useFonts({
    CormorantSC_400Regular,
    Roboto_100Thin,
  });

  const handleLogin = async() => {
    setLoading(true)
    await loginUser(email, senha)
    setLoading(false)
  }

  if (loading){
    return <Loading/>
  }

  return (
    <View className='flex items-center h-full w-full bg-[#fafafa]'>
      <StatusBar backgroundColor='#fafafa' barStyle="dark-content"/>
      <Spacer h={80}/>
      <Text className='font-cormorantSC text-[70px]'>MELLO</Text>
      <Spacer h={80}/>
      <Input value={email} onChangeText={setEmail} text='EMAIL' upper={false} placeholder='Digite seu email'/>
      <View>
        <Spacer h={18}/>
        <Input value={senha} onChangeText={setSenha} text='SENHA' upper={false} pass={true} placeholder='Digite sua senha'/>
        <TouchableOpacity className='flex items-end justify-center' onPress={() => router.push('/recuperarSenha')}>
          <Spacer h={9}/>
          <Text className='font-robotoThin color-[#004C72]'>Esqueci minha senha</Text>
        </TouchableOpacity>
        <Spacer h={50}/>
        <Button text='LOGAR' onPress={() => handleLogin()}/>
        <TouchableOpacity className='flex items-center justify-center' onPress={() => router.push('/cadastro')}>
          <Spacer h={9}/>
          <Text className='font-robotoThin color-[#004C72]'>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
}

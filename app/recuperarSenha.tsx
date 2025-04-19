import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import Spacer from '@/components/Spacer/Spacer';
import Input from '@/components/Input/Input';
import { userHook } from '@/contexts/Providers/UserProvider';
import ActionButton from '@/components/Buttons/ActionButton';

export default function RecuperarSenha() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const { recuperarUser } = userHook()

  const router = useRouter();

  const handleRecuperarSenha = async () => {
    await recuperarUser(email, senha, confirmarSenha)
  }

  return (
    <View className='flex items-center h-full w-full bg-[#fafafa]'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <Spacer h={80} />
      <Text className='font-cormorantSC text-[40px]'>RECUPERAR</Text>
      <Spacer h={50} />
      <ScrollView showsVerticalScrollIndicator={false} className="w-full">
        <View className='w-full flex items-center'>
          <Input value={email} onChangeText={setEmail} text='EMAIL' upper={false} placeholder='Digite seu email' />
          <Spacer h={18} />
          <Input value={senha} onChangeText={setSenha} text='SENHA' upper={false} pass={true} placeholder='Digite sua senha' />
          <Spacer h={18} />
          <Input value={confirmarSenha} onChangeText={setConfirmarSenha} text='CONFIRMAR SENHA' upper={false} pass={true} placeholder='Digite sua senha' />
          <Spacer h={50} />
          <ActionButton text='RECUPERAR' onPress={() => handleRecuperarSenha()} />
          <TouchableOpacity className='flex items-center justify-center' onPress={() => router.push('/cadastro')}>
            <Spacer h={9} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
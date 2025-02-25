import { View, Text, StatusBar, ScrollView } from 'react-native'
import React from 'react'

import ProfileButton from '@/app/components/Buttons/ProfileButton'
import ActionButton from '@/app/components/Buttons/ActionButton'
import InputText from '@/app/components/Input/InputText'
import Spacer from '@/app/components/Spacer/Spacer';
import Line from '@/app/components/Line/Line'

import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router'

export default function EditPerfil() {

  const router = useRouter()

  const handleEditUser = () => {
    
  }

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center '>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
      
      <View className='flex-col items-center justify-center'>
      <Spacer h={45}/>

        <Text className='font-cormorantSC text-[20px]'>perfil</Text>
        <Spacer h={24}/>
        <View className='flex-row'>
          <ProfileButton text='IMAGEM'/>
        </View>
        <Spacer h={60}/>
        <Line/>
        <Spacer h={25}/> 
        <InputText text='ACUA' header='NOME DE USUÁRIO'/>
        <Spacer h={35}/> 
        <InputText text='JOÂO VITOR VIANA CHAVES' header='NOME'/>
        <Spacer h={35}/> 
        <InputText text='JVVIANACHAVES@GMAIL.COM' header='EMAIL'/>
        
        <Spacer h={114}/> 
        <ActionButton text='RESETAR' color='#6E7687' onPress={() => router.back()}/>
        <Spacer h={21}/> 
        <ActionButton text='SALVAR' onPress={() => handleEditUser()}/>
        
      </View>
      </ScrollView>
    </View>
  )
}
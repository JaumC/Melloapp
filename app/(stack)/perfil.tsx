import { View, Text, StatusBar, ScrollView } from 'react-native'
import React from 'react'

import ProfileButton from '@/app/components/Buttons/ProfileButton'
import SmallButton from '@/app/components/Buttons/SmallButton'
import InputText from '@/app/components/Input/InputText'
import Spacer from '@/app/components/Spacer/Spacer';
import Line from '@/app/components/Line/Line'

import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router'

export default function Perfil() {

  const router = useRouter()

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
          <View className='absolute right-[50px] top-[115px]'>
            <SmallButton onPress={() => router.push('/editPerfil')} icon={<Feather name="edit" size={24} color="black" />}/>
          </View>
        <Spacer h={60}/>
        <Line/>
        <Spacer h={25}/> 
        <InputText w={133} text='XD567q' header='ID USUÁRIO'/>
        <Spacer h={35}/> 
        <InputText text='ACUA' header='NOME DE USUÁRIO'/>
        <Spacer h={35}/> 
        <InputText text='JOÂO VITOR VIANA CHAVES' header='NOME'/>
        <Spacer h={35}/> 
        <InputText text='JVVIANACHAVES@GMAIL.COM' header='EMAIL'/>
        <Spacer h={35}/> 
        <View className='flex-row'>
          <InputText w={140} text='20' header='COMPETIÇÕES'/>
          <Spacer w={5}/> 
          <InputText w={140} text='500' header='TOTAL DE PONTOS'/>
        </View>
        <Spacer h={45}/> 
        <Line/>
        <Spacer h={25}/>
        <Text className='font-cormorantSC text-[20px]'>medalhas</Text>
        <Spacer h={24}/>
      </View>
      </ScrollView>
    </View>
  )
}
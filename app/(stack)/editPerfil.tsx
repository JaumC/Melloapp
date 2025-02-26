import { View, Text, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import ProfileButton from '@/app/components/Buttons/ProfileButton'
import ActionButton from '@/app/components/Buttons/ActionButton'
import Input from '@/app/components/Input/Input'
import Spacer from '@/app/components/Spacer/Spacer';
import Line from '@/app/components/Line/Line'

import { useRouter, useGlobalSearchParams } from 'expo-router'
import { useSession } from '@/app/contexts/UserProvider'

export default function EditPerfil() {

  const router = useRouter()
  const { name, nick, email, profilePic }: any = useGlobalSearchParams();
  
  const [ newNick, setNewNick ] = useState(nick || '')
  const [ newName, setNewName ] = useState(name || '')
  const [ newEmail, setNewEmail ] = useState( email || '')
  const [ newProfilePic, setNewProfilePic ] = useState(profilePic || '')

  const { updateUser } =  useSession()

  const handleEditUser = async() => {
    const uptadeData = {
      nickname: newNick,
      name: newName,
      email: newEmail,
      profilePic: newProfilePic,
    }
    await updateUser(uptadeData)
  }

  useEffect(() => {
    setNewEmail(email || '')
    setNewNick(nick || '')
    setNewName(name || '')
    setNewProfilePic(profilePic || '')
  }, [nick, name, email, profilePic])

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
        <Input text='NOME DE USUÁRIO' value={newNick} onChangeText={setNewNick}/>
        <Spacer h={35}/> 
        <Input text='NOME' value={newName} onChangeText={setNewName}/>
        <Spacer h={35}/> 
        <Input text='EMAIL' value={newEmail} onChangeText={setNewEmail}/>
        
        <Spacer h={114}/> 
        <ActionButton text='RESETAR' color='#6E7687' onPress={() => router.back()}/>
        <Spacer h={21}/> 
        <ActionButton text='SALVAR' onPress={() => handleEditUser()}/>
        
      </View>
      </ScrollView>
    </View>
  )
}
import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Clipboard from 'expo-clipboard';

import ProfileButton from '@/app/components/Buttons/ProfileButton'
import SmallButton from '@/app/components/Buttons/SmallButton'
import InputText from '@/app/components/Input/InputText'
import Spacer from '@/app/components/Spacer/Spacer';
import Line from '@/app/components/Line/Line'

import Feather from '@expo/vector-icons/Feather';

import { useRouter } from 'expo-router'
import { useSession } from '@/app/contexts/UserProvider'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { notifyToast } from '@/app/utils/Toast'

export default function Perfil() {

  const router = useRouter()
  const { readUser } = useSession()

  const [ name, setName ] = useState('')
  const [ nick, setNick ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ score, setScore ] = useState('')
  const [ searchId, setSearchId ] = useState('')
  const [ competition, setCompetition ] = useState('')
  const [ profilePic, setProfilePic ] = useState('')

  const copyId = async() => {
    await Clipboard.setStringAsync(searchId);
    notifyToast('success', 'Sucesso', 'Código copiado!')
  }

  const handleUserInfos = async() => {
    const userInfos: any = await readUser()

    setName(userInfos.name)
    setNick(userInfos.nickname)
    setEmail(userInfos.email)
    setProfilePic(userInfos.profilePic)
    setCompetition(userInfos.competition)
    setScore(userInfos.tot_score)
    setSearchId(userInfos.search_id)
  }

  const editUser = () => {
    router.push({
      pathname: '/editPerfil',
      params: {
        name: name,
        nick: nick,
        profilePic: profilePic,
        email: email,
      },
    });
  }

  useEffect(() => {
    handleUserInfos()
  }, [])

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center '>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
      
      <TouchableOpacity onPress={() => copyId()} className='z-[2] absolute right-[140px] top-[290px]'>
        <FontAwesome6 name="copy" size={15} color="#5C5A5A" />
      </TouchableOpacity>
      <View className='flex-col items-center justify-center'>
      <Spacer h={45}/>

        <Text className='font-cormorantSC text-[20px]'>perfil</Text>
        <Spacer h={24}/>
        <View className='flex-row'>
          <ProfileButton text='IMAGEM'/>
        </View>
          <View className='absolute right-[50px] top-[115px]'>
            <SmallButton onPress={() => editUser()} icon={<Feather name="edit" size={24} color="black" />}/>
          </View>
        <Spacer h={60}/>
        <Line/>
        <Spacer h={25}/> 
        <InputText w={133} text={searchId} header='ID USUÁRIO'/>
        <Spacer h={35}/> 
        <InputText text={nick.toUpperCase()} header='NOME DE USUÁRIO'/>
        <Spacer h={35}/> 
        <InputText text={name.toUpperCase()} header='NOME'/>
        <Spacer h={35}/> 
        <InputText text={email.toUpperCase()} header='EMAIL'/>
        <Spacer h={35}/> 
        <View className='flex-row'>
          <InputText w={140} text={competition} header='COMPETIÇÕES'/>
          <Spacer w={5}/> 
          <InputText w={140} text={score} header='TOTAL DE PONTOS'/>
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
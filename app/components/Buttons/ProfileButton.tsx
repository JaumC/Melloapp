import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react'
import Spacer from '../Spacer/Spacer';

interface ProfileButtonProps {
    w?: number
    h?: number
    text?: string
    onPress?: () => void
}

const ProfileButton = ({w=80, h=80, text, onPress}: ProfileButtonProps) => {
  return (
    <View className='flex flex-col items-center' style={{width: w, height: h}} >
        <TouchableOpacity onPress={onPress} className='bg-[#F7E5E2] h-full w-full mr-[20px] shadow items-center justify-center rounded-full'>
            <FontAwesome5 name="user-alt" size={22} color="black" />
        </TouchableOpacity>
        <Spacer h={8}/>
        <Text className='font-robotoThin text-[13px] color-[#816B66]'>{text}</Text>
</View>
  )
}

export default ProfileButton;
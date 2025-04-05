import { View, Text, TouchableOpacity, Image } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react'
import Spacer from '../Spacer/Spacer';

interface ProfileButtonProps {
    w?: number
    h?: number
    text?: string
    onPress?: () => void
    profilePic?: string
}

const ProfileButton = ({w=80, h=80, text="", onPress, profilePic}: ProfileButtonProps) => {
  return (
    <View className='flex flex-col' style={{width: w, height: h}} >
      <TouchableOpacity onPress={onPress} className='bg-[#F7E5E2] h-full w-full mr-[20px] shadow items-center justify-center rounded-full'>
        {profilePic ? (
          <Image
          source={{ uri: profilePic }}
          className='h-full w-full rounded-full'/>
        ):(
            <FontAwesome5 name="user-alt" size={w/2} color="black" />
          )}
          </TouchableOpacity>
          {text !== "" && (
            <>
              <Spacer h={8}/>
              <Text className='text-center font-robotoThin text-[13px] color-[#816B66]'>{text}</Text>  
            </>
        )}
    </View>
  )
}

export default ProfileButton;
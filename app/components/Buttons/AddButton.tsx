import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import Spacer from '../Spacer/Spacer';

interface AddButtonProps {
    w?: number
    h?: number
    text?: string
    onPress?: () => void
}

const AddButton = ({w=80, h=80, text, onPress}: AddButtonProps) => {
  return (
    <View className='flex flex-col items-center'>
        <TouchableOpacity onPress={onPress} style={{width: w, height: h}} className='bg-[#F7E5E2] shadow items-center justify-center rounded-full'>
            <AntDesign name="pluscircle" size={22} color="black" />
        </TouchableOpacity>
        <Spacer h={8}/>
        <Text className='font-robotoThin text-[13px] color-[#816B66]'>{text}</Text>
</View>
  )
}

export default AddButton;
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
    text?: string
    onPress?: () => void
}

const Button = ({text, onPress} : ButtonProps) =>{
  return (
    <TouchableOpacity className='w-[274px] h-[40px] bg-[#A3BBA3] shadow items-center justify-center rounded-[15px]' onPress={onPress}>
      <Text className='color-[#ffffff] text-[14px]'>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button;
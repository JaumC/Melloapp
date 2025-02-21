import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ActionButtonProps {
    text?: string
    onPress?: () => void
    w?: number
    h?: number
}

const ActionButton = ({text, onPress, w=274, h=40} : ActionButtonProps) =>{
  return (
    <TouchableOpacity style={{width: w, height: h}} className='bg-[#A3BBA3] shadow items-center justify-center rounded-[15px]' onPress={onPress}>
      <Text className='color-[#ffffff] text-[14px]'>{text}</Text>
    </TouchableOpacity>
  )
}

export default ActionButton;
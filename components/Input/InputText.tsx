import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface InputTextProps {
  placeholder?: string
  onChangeText?: (text: string) => void
  upper?: boolean
  pass?: boolean
  value?: string
  header?: string
  text?: string
  w?: number
  h?: number
  singleLine?: boolean 
}

const InputText = ({ w = 274, h = 40, text, header, singleLine = false }: InputTextProps) => {
  return (
    <View style={{ width: w, height: h }}>
      <Text className='font-robotoThin text-[13px] font-[100] color-[#816B66] pl-[20px]'>{header}</Text>
      <View className='h-full justify-center border rounded-[20px] border-[#C4A59D] pl-[20px] pr-[20px]'>
        <Text
          className='font-robotoThin text-[13px] font-[700] color-[#816B66]'
          {...(singleLine ? { numberOfLines: 1, ellipsizeMode: 'tail' } : {})}
        >
          {text}
        </Text>
      </View>
    </View>
  )
}

export default InputText;
import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface InputProps {
  placeholder?: string
  onChangeText?: (text: string) => void
  upper?: boolean
  pass?: boolean
  value?: string
  text?: string
  w?: number
  h?: number
}

const Input = ({w=274, h=40, text, placeholder, pass=false, upper=true, value, onChangeText}: InputProps) => {

  return (
    <View >
      <Text className='font-robotoThin text-[13px] font-[100] color-[#816B66] pl-[20px]'>{text}</Text>
      <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={pass}
      onChangeText={onChangeText}
      placeholderTextColor="#C4A59D"
      autoCapitalize={upper ? 'sentences' : 'none'}
      className='outline-none border rounded-[20px] border-[#C4A59D] pl-[20px]'
      style={{width: w, height: h}}/>
    </View>
  )
}

export default Input;
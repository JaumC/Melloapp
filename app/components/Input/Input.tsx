import { View, Text, TextInput } from 'react-native'
import React from 'react'

import { useFonts } from 'expo-font';
import { CormorantSC_400Regular } from '@expo-google-fonts/cormorant-sc'; 

interface InputProps {
  text?: string
  placeholder?: string
  pass?: boolean
  upper?: boolean
}

const Input = ({text, placeholder, pass=false, upper=true}: InputProps) => {

    const [fontsLoaded] = useFonts({
      CormorantSC_400Regular,
    });
  
    if (!fontsLoaded) {
      return <Text>Carregando fontes...</Text>; 
    }
  

  return (
    <View>
      <Text className='font-robotoThin text-[13px] font-[100] color-[#000203] pl-[20px]'>{text}</Text>
      <TextInput
      placeholder={placeholder}
      placeholderTextColor="#C4A59D"
      secureTextEntry={pass}
      autoCapitalize={upper ? 'sentences' : 'none'}
      className='outline-none border w-[274px] h-[40px] rounded-[20px] border-[#C4A59D] pl-[20px]'
      />
    </View>
  )
}

export default Input;
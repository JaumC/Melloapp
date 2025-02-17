import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function Input() {
  return (
    <View>
      <TextInput
        placeholder='Type here'
        className='input outline-none h-[40px]'
      />
    </View>
  )
}
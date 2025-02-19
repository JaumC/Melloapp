import { View, Text } from 'react-native'
import React from 'react'

interface LineProps {
    w?: number
    h?: number
}

const Line = ({w=300, h=1}: LineProps) => {
  return (
    <View className='bg-[#C4A59D]' style={{width: w, height: h}}/>
  )
}

export default Line;
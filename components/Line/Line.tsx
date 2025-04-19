import { View } from 'react-native'
import React from 'react'

interface LineProps {
    w?: number
    h?: number
    direction?: boolean
}

const Line = ({w=300, h=1, direction=true}: LineProps) => {
  return (
    <>
      {direction ? (
        <View className='bg-[#C4A59D]' style={{width: w, height: h}}/>
      ) : (
        <View className='bg-[#C4A59D]' style={{width: h, height: w}}/>
      )}
    </>
  )
}

export default Line;
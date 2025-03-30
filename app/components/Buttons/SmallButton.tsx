import { TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'

interface SmallButtonProps {
  icon?: ReactElement
  onPress?: () => void
  w?: number
  h?: number
  pressed?: boolean
}

const SmallButton = ({ icon, onPress, w = 40, h = 40, pressed = true }: SmallButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: w,
          height: h,
          backgroundColor: pressed ? '#D9D9D9' : '#ADB4FF', 
          borderRadius: 11,
          justifyContent: 'center', 
          alignItems: 'center', 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25, 
          shadowRadius: 3.5, 
          elevation: 3,
          borderWidth: pressed ? 1 : 0,
        },
      ]}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  )
}

export default SmallButton;

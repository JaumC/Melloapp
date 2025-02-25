import { TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'

interface SmallButtonProps {
  icon?: ReactElement
  onPress?: () => void
  w?: number
  h?: number
  press?: boolean
}

const SmallButton = ({ icon, onPress, w = 40, h = 40, press = false }: SmallButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: w,
          height: h,
          backgroundColor: 'white', 
          borderRadius: 11,
          justifyContent: 'center', 
          alignItems: 'center', 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25, 
          shadowRadius: 3.5, 
          elevation: 3,
          borderWidth: 1,
        },
      ]}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  )
}

export default SmallButton;

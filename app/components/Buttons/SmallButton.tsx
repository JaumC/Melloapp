import { TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'

interface SmallButtonProps {
    icon?: ReactElement
    onPress?: () => void
    w?: number
    h?: number
    state?: boolean
}

const SmallButton = ({icon, onPress, w=35, h=35, state=false} : SmallButtonProps) =>{
  return (
    
    <TouchableOpacity style={[{width: w, height: h}, state ? {borderWidth: 0} : {}]} className='bg-[#A3BBA3] shadow border border-[#838383] items-center justify-center rounded-[10px]' onPress={onPress}>
      {icon}
    </TouchableOpacity>
  )
}

export default SmallButton;
import { TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'

const shadowOpt = {
  width: 200,
  height: 100,
  color: "#000",
  border: 10,
  radius: 5,
  opacity: 0.2,
  x: 0,
  y: 0,
  style: { marginTop: 30 }
}

interface SmallButtonProps {
    icon?: ReactElement
    onPress?: () => void
    w?: number
    h?: number
    press?: boolean
}

const SmallButton = ({icon, onPress, w=35, h=35, press=false} : SmallButtonProps) =>{
  return (
    <TouchableOpacity style={[{ width: w, height: h }]} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  )
}

export default SmallButton;

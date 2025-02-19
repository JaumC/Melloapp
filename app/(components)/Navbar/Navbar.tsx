import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'

interface NavbarProps {
    color?: string;
    icon_fst?: ReactElement;
    icon_snd?: ReactElement;
    onPress_fst?: () => void;
    onPress_snd?: () => void;
}

const Navbar = ({color='#C4A59D', icon_fst, icon_snd, onPress_fst, onPress_snd} : NavbarProps) => {
  return (
    <View style={{ backgroundColor: color}} className='h-[45px] w-full'>
        {icon_fst && (
            <TouchableOpacity onPress={onPress_fst} className='flex items-center justify-center h-full w-[45px]'>
                {icon_fst}
            </TouchableOpacity>
        )}
        {icon_snd && (
            <TouchableOpacity onPress={onPress_snd} className='flex items-center justify-center h-full w-[45px]'>
                {icon_snd}
            </TouchableOpacity>
        )}
    </View>
  )
}

export default Navbar;
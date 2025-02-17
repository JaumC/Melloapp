import { UserContext } from '@/contexts/Providers/UserProvider'
import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Input from '@/components/Input/Input'

export default function Login() {
    const { login }: any = useContext(UserContext)

    console.log(login)
    return (
      <View>
        <Text>Login</Text>
        <Input/>
      </View>
    )
}
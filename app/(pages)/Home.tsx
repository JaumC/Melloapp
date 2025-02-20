import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '@/contexts/Providers/UserProvider'

export default function HomeScreen() {
  const { logout } = useContext(UserContext)
  return (
    <View>
      <Pressable onPress={() => logout()}>
          <Text>
            Home
          </Text>
        </Pressable>
    </View>
  )
}
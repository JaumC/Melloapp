import { View, Text, ScrollView, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '@/contexts/Providers/UserProvider'

export default function Home() {
  const { logout } = useContext(UserContext)

  return (
    <View className='bg-[#fafafa] h-full w-full'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <Text>o</Text>
      </ScrollView>
    </View>
  )
}
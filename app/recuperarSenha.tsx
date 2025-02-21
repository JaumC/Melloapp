import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'

export default function RecuperarSenha() {

    const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text>RecuperarSenha</Text>
        </TouchableOpacity>
    </View>
  )
}
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function RecuperarSenha() {

    const navigation: any = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>RecuperarSenha</Text>
        </TouchableOpacity>
    </View>
  )
}
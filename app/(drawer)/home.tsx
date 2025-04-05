import { View, Text, ScrollView, StatusBar } from 'react-native';
import { useState } from 'react';

import { useRouter } from "expo-router";

import AddButton from '@/components/Buttons/AddButton';
import Spacer from '@/components/Spacer/Spacer';
import { userHook } from '@/app/contexts/UserProvider';

export default function Home() {
  const router = useRouter();
  const [dare, setDare] = useState(false);

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center justify-center'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <Spacer h={40} />
      <Text className="font-cormorantSC text-[24px] text-center">mello</Text>
      {!dare ? (
        <View className='w-full h-full flex justify-center items-center'>
          <AddButton onPress={() => router.push('/cadastrarDesafio')} text='ADCIONAR DESAFIO' />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
        </ScrollView>
      )}
    </View>
  );
}

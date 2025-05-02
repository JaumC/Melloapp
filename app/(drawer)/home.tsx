import { View, Text, ScrollView, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';

import { useRouter } from "expo-router";

import AddButton from '@/components/Buttons/AddButton';
import Spacer from '@/components/Spacer/Spacer';
import { dareHook } from '@/contexts/Providers/DareProvider';
import Line from '@/components/Line/Line';
import DareCard from '@/components/Dare/DareCard';

export default function Home() {
  const router = useRouter();

  const { readDare, dare } = dareHook()

  useEffect(() => {
    readDare()
  }, [])

  return (
    <View className='bg-[#fafafa] flex-1 w-full items-center'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <Spacer h={40} />
      <Text className="font-cormorantSC text-[24px] text-center">mello</Text>
      <Spacer h={20} />
      <Line />
      <Spacer h={20} />

      {dare ? (
        <ScrollView showsVerticalScrollIndicator={false} className="w-full px-2">
          {dare?.map((d: any) => (
            <View key={d?.dare._id} className='w-full flex justify-center items-center mb-4'>
              <DareCard dare={d?.dare} dayPoints={d?.dayPoints} onOpen={() => router.push(`/dare/${d?.dare?._id}`)}/>
            </View>
          ))}
          <Spacer h={60} />
        </ScrollView>
      ) : (
        <View className='w-full h-full flex justify-center items-center'>
          <AddButton onPress={() => router.push('/cadastrarDesafio')} text='ADCIONAR DESAFIO' />
        </View>
      )}
    </View>
  );
}
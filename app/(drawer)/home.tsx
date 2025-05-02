import { View, Text, ScrollView, StatusBar } from 'react-native';

import { useRouter } from "expo-router";

import AddButton from '@/components/Buttons/AddButton';
import Spacer from '@/components/Spacer/Spacer';
import { dareHook } from '@/contexts/Providers/DareProvider';
import Line from '@/components/Line/Line';
import DareCard from '@/components/Dare/DareCard';
import { useEffect, useState } from 'react';
import { userHook } from '@/contexts/Providers/UserProvider';

export default function Home() {

  const { readDare } = dareHook()
  const { user } = userHook()
  const [ dare, setDare ] = useState<any>([])

  const router = useRouter()

  const getOneDare = async () => {
    const response = await readDare("")
    setDare(response)
  }

  useEffect(() => {
      getOneDare()
  }, [user?.id])

  return (
    <View className='bg-[#fafafa] flex-1 w-full items-center'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <Spacer h={40} />
      <Text className="font-cormorantSC text-[24px] text-center">mello</Text>
      <Spacer h={20} />
      <Line />
      <Spacer h={20} />

      {dare.length > 0 ? (
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
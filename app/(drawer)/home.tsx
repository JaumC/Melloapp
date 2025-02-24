import { View, Text, ScrollView, StatusBar } from 'react-native';
import { useState } from 'react';

import { CormorantSC_400Regular } from '@expo-google-fonts/cormorant-sc'; 
import { Roboto_100Thin } from '@expo-google-fonts/roboto'; 
import { useFonts } from 'expo-font';

import { useRouter } from "expo-router";

import AddButton from '@/app/components/Buttons/AddButton';
import Loading from '@/app/components/Loading/Loading';
import Spacer from '@/app/components/Spacer/Spacer';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dare, setDare] = useState(false);

  useFonts({
    CormorantSC_400Regular,
    Roboto_100Thin,
  });

  if (loading){
    return <Loading/>
  }

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center justify-center'>
        <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
        <Spacer h={40} />
        <Text className="font-cormorantSC text-[24px] text-center">mello</Text>
        {!dare ? (
          <View className={loading ? 'opacity-0' : 'opacity-100'}>
              <View className='w-full h-full flex justify-center items-center'>
                <AddButton onPress={() => router.push('/cadastrarDesafio')} text='ADCIONAR DESAFIO' />
              </View>
          </View>
        ):(
          <ScrollView showsVerticalScrollIndicator={false}>
          </ScrollView>
        )}
    </View>
  );
}

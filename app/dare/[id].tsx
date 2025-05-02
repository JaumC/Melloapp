import DareCard from '@/components/Dare/DareCard';
import Line from '@/components/Line/Line';
import Spacer from '@/components/Spacer/Spacer';
import { dareHook } from '@/contexts/Providers/DareProvider';
import { loadingHook } from '@/contexts/Providers/LoadingProvider';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, Text, View, ScrollView } from 'react-native';

export default function DarePage() {
  const { id } = useLocalSearchParams();

  const { readDare } = dareHook()
  const { setLoading } = loadingHook()
  const [dataCard, setDareDataCard] = useState<any>(null)

  const calculateDaysLeft = (endDateStr: string) => {
    const [day, month, year] = endDateStr.split('/');
    const endDate = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();
  
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return diffDays > 0 ? diffDays : 0;
  };

  const router = useRouter()

  const getOneDare = async () => {
    setLoading(true)
    const response = await readDare(id.toString())
    setDareDataCard(response?.[0])
    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      getOneDare()
    }
  }, [id])

  return (
    <View className='bg-[#fafafa] flex-1 w-full items-center'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <Spacer h={40} />
      {dataCard && (
        <>
          <View className='flex-row items-center justify-center'>
            <FontAwesome6 name="trophy" size={19} color="#717171" />
            <Spacer w={10} />
            <Text className="font-cormorantSC text-[24px] text-center">{dataCard?.dare?.name.toLowerCase()}</Text>
          </View>
          <Spacer h={20} />
          <View className='w-[90%] h-[32px] bg-[#A3BBA3] rounded-[8px] shadow-md shadow-black flex-row justify-between items-center px-4 '>
            <Text className="text-black my-2">{dataCard?.dare?.days}/{calculateDaysLeft(dataCard?.dare?.end_date)} Dias Restantes</Text>
            <Spacer w={10} />
            <Text className="text-[#545252] my-2">{dataCard?.dare?.streak} PTS</Text>
          </View>
          <Spacer h={15} />

          <View className='px-2 w-full flex justify-center items-center mb-4'>
            <DareCard
              home={false}
              dare={dataCard?.dare}
              dayPoints={dataCard?.dayPoints}
              onOpen={() => router.push(`/dare/${dataCard?.dare?._id}`)}
            />
          </View>
          <Spacer h={10} />
          <Line/>
          <Spacer h={10} />
          <ScrollView showsVerticalScrollIndicator={false} className="w-full px-2">
          </ScrollView>
        </>
      )}
    </View>
  );
}

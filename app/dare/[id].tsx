import ProfileButton from '@/components/Buttons/ProfileButton';
import DareCard from '@/components/Dare/DareCard';
import Line from '@/components/Line/Line';
import Spacer from '@/components/Spacer/Spacer';
import { dareHook } from '@/contexts/Providers/DareProvider';
import { loadingHook } from '@/contexts/Providers/LoadingProvider';
import { API_URL } from '@/utils/API_URL';
import { calculateDaysLeft } from '@/utils/CalculateDaysLeft';
import { getTextColor } from '@/utils/TextColor';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, Text, View, ScrollView } from 'react-native';

export default function DarePage() {
  const { id } = useLocalSearchParams();
  const { readDare, readRank } = dareHook();
  const { setLoading } = loadingHook();

  const [dataCard, setDareDataCard] = useState<any>(null);
  const [ranking, setRanking] = useState<any>([]);

  const router = useRouter();

  const getOneDare = async () => {
    const response = await readDare(id.toString());
    setDareDataCard(response?.[0]);
  };

  const getRanking = async () => {
    const response = await readRank(id.toString());
    setRanking(response);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      getOneDare();
      getRanking();
      setLoading(false);
    }
  }, [id]);

  return (
    <View className="bg-[#fafafa] flex-1 w-full items-center">
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <Spacer h={40} />

      {dataCard && (
        <>
          <View className="flex-row items-center justify-center">
            <FontAwesome6 name="trophy" size={19} color="#717171" />
            <Spacer w={10} />
            <Text className="font-cormorantSC text-[24px] text-center">
              {dataCard?.dare?.name.toLowerCase()}
            </Text>
          </View>

          <Spacer h={20} />

          <View className="w-[90%] h-[32px] bg-[#A3BBA3] rounded-[8px] shadow-md shadow-black flex-row justify-between items-center px-4">
            <Text className="text-black my-2">
              {dataCard?.dare?.days}/{calculateDaysLeft(dataCard?.dare?.end_date)} Dias Restantes
            </Text>
            <Spacer w={10} />
            <Text className="text-[#545252] my-2">{dataCard?.dare?.streak} PTS</Text>
          </View>

          <Spacer h={15} />

          <View className="px-2 w-full flex justify-center items-center mb-4">
            <DareCard
              home={false}
              dare={dataCard?.dare}
              dayPoints={dataCard?.dayPoints}
              onOpen={() => router.push(`/dare/${dataCard?.dare?._id}`)}
            />
          </View>

          <Spacer h={10} />
          <Line />
          <Spacer h={10} />

          {ranking && (
            <ScrollView showsVerticalScrollIndicator={false} className="w-full px-2">
              {ranking.map((rank: any, index: number) => {
                const profilePic = `${API_URL}/user/photo/${rank?.userId}?timestamp=${new Date().getTime()}`;
                const borderColor = getTextColor(rank?.color)

                return (
                  <View key={index} style={{
                    backgroundColor:
                      rank.position == '1' ? "#E9E9C9" :
                        rank.position == '2' ? "#E2E2E2" :
                          rank.position == "3" ? "#E7E7E0" : "#FAFAFA",
                    borderColor:
                      rank.position == '1' ? "#ACAC13" :
                        rank.position == '2' ? "#8A8A8A" :
                          rank.position == "3" ? "#A4A27F" : "#707070",

                  }}
                    className='w-full p-2 rounded-[12px] flex-row border items-center px-6 mt-5'>
                    <View className='flex-row items-center w-full justify-between'>
                      <View className='flex-row items-center'>
                        <ProfileButton w={60} h={60} profilePic={profilePic} />
                        <Spacer w={15} />
                        <View>
                          <View className='flex-row'>
                            <Text className='font-cormorantSC text-[16px]'>{rank.nickname.toUpperCase()}</Text>
                            <Spacer w={15} />
                            <View style={{ backgroundColor: rank.color, borderColor: borderColor }} className='w-[20px] h-[20px] rounded-[8px] border' />
                          </View>
                          <View className='flex-row items-center'>
                            <Text className='font-bold color-[#7C7F81]'>
                              {rank.points}
                            </Text>
                            <Text className='color-[#816B66] font-robotoThin text-[13px] font-[100]'> PTS</Text>
                          </View>
                        </View>
                      </View>
                      {rank.position == "1" ? (
                        <View className='w-[40px] h-[40px] rounded-[8px] flex items-center bg-[#B1B173] justify-center'>
                          <FontAwesome6 name="trophy" size={19} color="#FFFF00" />
                        </View>
                      ) : (
                        <View style={{ borderWidth: rank.position > "3" ? 1 : 0, backgroundColor: rank.position == "2" ? "#A9AAB9" : rank.position == "3" ? "#A4A27F" : "#FAFAFA" }} className='w-[40px] h-[40px] rounded-[8px] flex items-center bg-[#B1B173] justify-center'>
                          <Text className='font-bold'>{rank.position}º</Text>
                        </View>
                      )}
                    </View>
                    <Spacer h={2} />
                  </View>
                );
              })}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

import { Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Spacer from '../Spacer/Spacer'
import Feather from '@expo/vector-icons/Feather'
import { Dare } from '@/utils/Typos'

interface DareProps {
    dareData?: Dare
}

const DareCard = ({ dareData }: DareProps) => {
    return (
        <>
            <View className='w-[95%] h-[32px] bg-[#A3BBA3] rounded-t-[8px] shadow-md shadow-black flex-row justify-between items-center px-4'>
                <View className='flex-row items-center'>
                    <FontAwesome6 name="trophy" size={19} color="white" />
                    <Spacer w={10} />
                    <Text className="text-[#545252] my-2">{dareData?.name}</Text>
                </View>
                <Feather name="edit" size={20} color="#545252" />
            </View>
            <View className='w-[95%] h-[335px] flex items-center bg-[#F7E5E2] shadow-md shadow-black rounded-b-[8px] justify-between'>
                <View>
                    <Text>teste</Text>
                </View>
                <View className='flex-row w-full justify-between px-4 pb-2'>
                    <Text>{dareData?.days + 'D'}</Text>
                    <Text>{dareData?.streak + 'PTS'}</Text>
                </View>
            </View>
        </>
    )
}

export default DareCard;
import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Spacer from '../Spacer/Spacer'
import Feather from '@expo/vector-icons/Feather'
import { Dare } from '@/utils/Typos'
import moment from 'moment'

interface DareProps {
    dareData?: Dare
}

const DareCard = ({ dareData }: DareProps) => {
    const days = generateDays(
        dareData?.start_date || '',
        dareData?.end_date || '',
        dareData?.weekend || false,
    )
    const [markedDays, setMarkedDays] = useState(false)
    const weekend = dareData?.weekend ? 7 : 5
    console.log(days)
    console.log(dareData?.start_date)

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
            <View className='flex-col w-[95%] bg-[#F7E5E2] shadow-md shadow-black rounded-b-[8px]'>
                <View className='w-[100%] flex-row  content-start p-2 justify-start'>
                    {chunckIntoColumns(days, weekend).map((column, colIndex) => (
                        <View key={colIndex} className='flex-col'>
                            {column.map((dayIndex) => (
                                <TouchableOpacity onPress={() => setMarkedDays(mark => !mark)} key={dayIndex} className={`w-[30px] h-[30px] rounded-md m-[3px] ${markedDays ? 'bg-purple-600' : 'bg-gray-300'}`} />

                            ))}
                        </View>
                    ))}
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

function generateDays(startDate: string, endDate: string, includoWeekend: boolean) {
    const days: string[] = []
    let current = moment(startDate, "DD/MM/YYYY")
    const end = moment(endDate, "DD/MM/YYYY")

    while (current.isSameOrBefore(end)) {
        const dayOfWeek = current.isoWeekday()
        if (includoWeekend || (dayOfWeek >= 1 && dayOfWeek <= 5)) {
            days.push(current.format("YYYY-MM-DD"))
        }
        current.add(1, 'day')
    }
    return days
}

function chunckIntoColumns<T>(array: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size))
    }
    return result
}

// <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//   {columns.map((col, colIndex) => (
//     <View key={colIndex} className="flex-col items-center">
//       {col.map((day, index) => (
//         <TouchableOpacity key={index} className="w-[30px] h-[30px] m-[3px] bg-gray-300 rounded-md" />
//       ))}
//     </View>
//   ))}
// </ScrollView>

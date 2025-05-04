import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Spacer from '../Spacer/Spacer'
import Feather from '@expo/vector-icons/Feather'
import { Dare, DayPoint } from '@/utils/Typos'
import moment from 'moment'
import { userHook } from '@/contexts/Providers/UserProvider'
import { useRouter } from 'expo-router'
import { dareHook } from '@/contexts/Providers/DareProvider'
import { getTextColor } from '@/utils/TextColor'

interface DareProps {
    dare?: Dare
    dayPoints?: DayPoint
    onOpen?: () => void
    home?: boolean
}

const DareCard = ({ dare, dayPoints, onOpen, home = true }: DareProps) => {
    const days = generateDays(
        dare?.start_date || '',
        dare?.end_date || '',
        dare?.weekend || false,
    )

    const [markedDays, setMarkedDays] = useState(new Set())

    const { user } = userHook()
    const { addDay, removeDay } = dareHook()

    const textColor = getTextColor(user?.color || '#000000')
    const router = useRouter()

    const weekend = dare?.weekend ? 7 : 5
    let today = moment().format("YYYY-MM-DD")

    const handleCheckDay = async (dayId: string) => {
        if (dayId !== today || !user) return;

        setMarkedDays((prev) => {
            const newSet = new Set(prev);

            if (newSet.has(dayId)) {
                newSet.delete(dayId);
            } else {
                newSet.add(dayId);
            }

            return newSet;
        });

        if (!dare?._id) return;

        if (markedDays.has(dayId)) {
            await removeDay(dare?._id, dayId);
        } else {
            await addDay(dare?._id, dayId);
        }
    };

    useEffect(() => {
        if (!dayPoints?.days || !user) return

        const marked = new Set<string>()

        const allDays = dayPoints.days
        for (const [date, entries] of Object.entries(allDays)) {
            if (Array.isArray(entries) && entries.some((e: { user_id: string }) => e.user_id === user.id)) {
                marked.add(date)
            }
        }
        setMarkedDays(marked)
    }, [dayPoints, user])

    const calcTotalMarked = (dayIndex: string) => {

        const usersMarked = dayPoints?.days[dayIndex] || [];

        const isUserMarked = usersMarked.some((entry) => entry.user_id === user?.id);

        const totalMarked = isUserMarked ? usersMarked.length - 1 : usersMarked.length;

        return totalMarked != 0 ? "+ " + totalMarked : "";
    }

    return (
        <>
            {home && (
                <TouchableOpacity onPress={onOpen} className='w-[95%] h-[32px] bg-[#A3BBA3] rounded-t-[8px] shadow-md shadow-black flex-row justify-between items-center mt-2 pl-4'>
                    <View className='flex-row items-center'>
                        <FontAwesome6 name="trophy" size={19} color="white" />
                        <Spacer w={10} />
                        <Text className="text-[#545252] my-2">{dare?.name}</Text>
                    </View>
                    {dare?.host === user?.id && (
                        <TouchableOpacity className='h-full flex items-center justify-center w-[50px]' onPress={() => router.push(`/editarDesafio/${dare?._id}`)}>
                            <Feather name="edit" size={20} color="#545252" />
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            )}
            <View style={{ borderTopLeftRadius: !home ? 8 : 0, borderTopRightRadius: !home ? 8 : 0 }}className='flex-col w-[95%] bg-[#F7E5E2] shadow-md shadow-black rounded-b-[8px]'>
                <View className='w-[100%] flex-row content-start p-4 justify-start'>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {(() => {
                            const realColumns = chunckIntoColumns(days, weekend)
                            const minColumns = 9
                            const totalColumns = [...realColumns]

                            while (totalColumns.length < minColumns) {
                                totalColumns.push([]) // coluna vazia
                            }

                            return totalColumns.map((column, colIndex) => (
                                <View key={colIndex} className="flex-col">
                                    {column.map((dayIndex) => (
                                        <TouchableOpacity
                                            onPress={() => handleCheckDay(dayIndex)}
                                            key={dayIndex}
                                            style={{
                                                backgroundColor: markedDays.has(dayIndex) ? user?.color : '#D9D9D9',
                                                borderWidth: markedDays.has(dayIndex) ? 0 : 1,
                                                borderColor: today === dayIndex ? user?.color : '#D9D9D9',
                                                opacity: today === dayIndex ? 1 : markedDays.has(dayIndex) ? 0.5 : 1,
                                            }}
                                            className='w-[30px] h-[30px] flex items-center justify-center rounded-md m-[3px]'>
                                            {today === dayIndex && !markedDays.has(dayIndex) && (
                                                <Feather name="check" size={15} color={user?.color} />
                                            )}
                                            {(today > dayIndex && !home) && (
                                                <Text style={{ color: textColor, fontSize: 10 }}>{calcTotalMarked(dayIndex)}</Text>
                                            )}

                                        </TouchableOpacity>
                                    ))}

                                    {/* Preenchimento vertical com quadrados vazios */}
                                    {Array.from({ length: weekend - column.length }).map((_, i) => (
                                        <View
                                            key={`placeholder-${colIndex}-${i}`}
                                            className="w-[30px] h-[30px] m-[3px] rounded-md border border-[#D9D9D9] bg-transparent"
                                        />
                                    ))}
                                </View>
                            ))
                        })()}
                    </ScrollView>

                </View>
                {home && (
                    <View className='flex-row w-full justify-between px-4 pb-2'>
                        <Text className='text-[#545252]'>{dare?.days + 'D'}</Text>
                        <Text className='text-[#545252]'>{dare?.streak + 'PTS'}</Text>
                    </View>
                )}
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
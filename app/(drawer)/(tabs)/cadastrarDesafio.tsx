import { View, Text, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacer from '@/components/Spacer/Spacer'
import Line from '@/components/Line/Line'
import SwitchButton from '@/components/Buttons/SwitchButton'
import Input from '@/components/Input/Input'
import ActionButton from '@/components/Buttons/ActionButton'
import DatePickerInput from '@/components/Input/DatePicker'
import InputText from '@/components/Input/InputText'
import { notifyToast } from '@/utils/Toast'
import { dareHook } from '@/contexts/Providers/DareProvider'


export default function CadastrarDesafio() {

  const { createDare } = dareHook()

  const [dataStart, setDataStart] = useState('')
  const [dataEnd, setDataEnd] = useState('')
  const [onWeekends, setOnWeekends] = useState(true)
  const [days, setDays] = useState('')
  const [friends, setFriends] = useState([])

  const [dareName, setDareName] = useState('')

  const [dareSequenceDay, setDareSequenceDay] = useState('')
  const [dareSequenceMounth, setDareSequenceMounth] = useState('')

  const [dareStreak, setDareStreak] = useState('')

  const getDiffDays = () => {
    if (!dataStart || !dataEnd) return;
    if (dataStart > dataEnd) {
      notifyToast('error', 'Erro', 'A data incial deve ser menor do que a final.')
    };

    const [startDay, startMonth, startYear] = dataStart.split('/').map(Number);
    const [endDay, endMonth, endYear] = dataEnd.split('/').map(Number);

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    let businessDays = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay(); // 0 = Domingo, 6 = Sábado

      if (onWeekends || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
        businessDays++;
      }
    }

    setDays(businessDays.toString() + 'D')
  };

  const handleRegister = async () => {
    const dareData = {
      name: dareName,
      startDate: dataStart,
      endDate: dataEnd,
      days: days,
      weekend: onWeekends,
      friends: friends,
      sequencyDay: dareSequenceDay,
      sequencyMounth: dareSequenceMounth,
      streak: dareStreak,
    }

    await createDare(dareData)
  }

  useEffect(() => {
    getDiffDays()
  }, [dataStart, dataEnd, onWeekends])

  return (
    <View className='bg-[#fafafa] flex h-full w-full'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <View className='w-full h-full flex justify-center items-center'>
          <Spacer h={8} />
          <Text className="font-cormorantSC text-[24px] text-center">cadastrar desafio</Text>
          <Spacer h={28} />
          <Input text='NOME DO DESAFIO' placeholder='Digite algo...' onChangeText={setDareName} />
          <Spacer h={20} />
          <View className='flex-row'>
            <DatePickerInput text='DATA INÍCIO' w={120} onChangeDate={(date: any) => setDataStart(date.toLocaleDateString('pt-BR'))} />
            <Spacer w={30} />
            <DatePickerInput text='DATA FIM' w={120} onChangeDate={(date: any) => setDataEnd(date.toLocaleDateString('pt-BR'))} />
          </View>
          {days ? (
            <View className='flex-row'>
              <View>
                <Line direction={false} w={17} />
                <Line w={48} />
              </View>
              <Text className='pl-[10px] pr-[10px] font-robotoThin text-[13px] font-[100] color-[#816B66] mt-[10px]'>{days}</Text>
              <View style={{ transform: [{ scaleX: -1 }] }}>
                <Line direction={false} w={17} />
                <Line w={48} />
              </View>
              <Spacer h={40} />
            </View>
          ) : (
            <Spacer h={30} />
          )}
          <View className='flex-row'>
            <Input text='ADCIONAR COMPETIDOR' placeholder='Digite algo...' w={190} />
            <Spacer w={20} />
            <InputText text={`${friends.length + 1}/8`} w={60} />
          </View>
          <Spacer h={25} />
          <SwitchButton onChangeSwitch={setOnWeekends} />
          <Spacer h={30} />
          <Line />
          <Spacer h={40} />
          <View>
            <Input text='SEQUÊNCIA DIÁRIA' placeholder='2 dias' w={160} onChangeText={setDareSequenceDay} />
            <Spacer h={20} />
            <Input text='SEQUÊNCIA MENSAL' placeholder='2 mêses' w={160} onChangeText={setDareSequenceMounth} />
            <Spacer h={20} />
            <Input text='PONTOS POR DIA' placeholder='2 pts' w={160} onChangeText={setDareStreak} />
          </View>
          <Spacer h={30} />
          <ActionButton text='CRIAR DESAFIO' onPress={() => handleRegister()} />
        </View>
      </ScrollView>
    </View>
  )
}
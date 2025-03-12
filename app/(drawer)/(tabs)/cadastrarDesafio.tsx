import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Spacer from '@/app/components/Spacer/Spacer'
import Line from '@/app/components/Line/Line'
import SwitchButton from '@/app/components/Buttons/SwitchButton'
import Input from '@/app/components/Input/Input'
import ActionButton from '@/app/components/Buttons/ActionButton'
import DatePickerInput from '@/app/components/Input/DatePicker'
import InputText from '@/app/components/Input/InputText'

export default function CadastrarDesafio() {
  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center justify-center'>
        <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
        <Spacer h={40} />
        <Text className="font-cormorantSC text-[24px] text-center">cadastrar desafio</Text>
          <View className='w-full h-full flex justify-center items-center'>
            <Input text='NOME DO DESAFIO' placeholder='Digite algo...'/>
            <Spacer h={20}/>
            <View className='flex-row'>
              <DatePickerInput text='DATA INÍCIO' w={120}/>
              <Spacer w={30}/>
              <DatePickerInput text='DATA FIM' w={120}/>
            </View>
            <Spacer h={40}/>
            <View className='flex-row'>
              <Input text='ADCIONAR COMPETIDOR' placeholder='Digite algo...' w={190}/>
              <Spacer w={20}/>
              <InputText text='1/8' w={60}/>
            </View>
            <SwitchButton/>
            <Spacer h={40}/>
            <Line/>
            <Spacer h={40}/>
            <View>
              <Input text='SEQUÊNCIA DIÁRIA' placeholder='2 dias' w={160}/>
              <Spacer h={20}/>
              <Input text='SEQUÊNCIA MENSAL' placeholder='2 mêses' w={160}/>
              <Spacer h={20}/>
              <Input text='PONTOS POR DIA' placeholder='2 pts' w={160}/>
            </View>
            <Spacer h={30}/>
            <ActionButton text='CRIAR DESAFIO'/>
          </View>
    </View>
  )
}
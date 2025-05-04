import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
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
import Modal from '@/utils/Modal'
import { userHook } from '@/contexts/Providers/UserProvider'
import ProfileButton from '@/components/Buttons/ProfileButton'
import { API_URL } from '@/utils/API_URL'
import SmallButton from '@/components/Buttons/SmallButton'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { User } from '@/utils/Typos'
import { getDiffDays } from '@/utils/GetDifDays'

export default function CadastrarDesafio() {

  const { createDare } = dareHook()
  const { readFriends, user } = userHook()

  const [showModal, setShowModal] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState(new Set());

  const [dataStart, setDataStart] = useState('')
  const [dataEnd, setDataEnd] = useState('')
  const [onWeekends, setOnWeekends] = useState(true)
  const [days, setDays] = useState('')
  const [friends, setFriends] = useState<User[]>([])

  const [dareName, setDareName] = useState('')

  const [dareSequenceDay, setDareSequenceDay] = useState('')
  const [dareSequenceMounth, setDareSequenceMounth] = useState('')

  const [dareStreak, setDareStreak] = useState('')

  const selectedNicknames = friends
    .filter((f) => selectedFriends.has(f.id))
    .map((f) => (f.nickname ?? '').toUpperCase())
    .join(', ');

  const handleRegister = async () => {
    const dareData = {
      name: dareName,
      start_date: dataStart,
      end_date: dataEnd,
      days: days,
      weekend: onWeekends,
      challengers: Array.from(selectedFriends) as string[],
      host: user?.id,
      day_sequency: dareSequenceDay,
      mounth_sequency: dareSequenceMounth,
      streak: dareStreak,
    }

    await createDare(dareData)

    setDareName('');
    setDataStart('');
    setDataEnd('');
    setDays('');
    setSelectedFriends(new Set());
    setDareSequenceDay('');
    setDareSequenceMounth('');
    setDareStreak('');
    setShowModal(false);
    setOnWeekends(true);

  }

  const addChallengers = async () => {
    const response: any = await readFriends('');
    setFriends(response);
  };

  const handleSelectFriend = (userId: string) => {
    setSelectedFriends((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        if (newSet.size >= 7) {
          notifyToast('error', 'Limite atingido', 'Máximo de 7 competidores permitidos.');
          return prev;
        }
        newSet.add(userId);
      }

      return newSet;
    });
  }

  useEffect(() => {
    const businessDays = getDiffDays(dataStart, dataEnd, onWeekends) || ''
    setDays(businessDays)
  }, [dataStart, dataEnd, onWeekends])

  useEffect(() => {
    addChallengers()
  }, [showModal])

  return (
    <View className='bg-[#fafafa] flex h-full w-full'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <View className='w-full h-full flex justify-center items-center'>
          <Spacer h={8} />
          <Text className="font-cormorantSC text-[24px] text-center">cadastrar desafio</Text>
          <Spacer h={28} />
          <Input text='NOME DO DESAFIO' placeholder='Digite algo...' onChangeText={setDareName} value={dareName} />
          <Spacer h={20} />
          <View className='flex-row'>
            <DatePickerInput
              text='DATA INÍCIO'
              placeholder='DD/MM/AAAA'
              w={120}
              value={dataStart}
              onChangeDate={(date) => setDataStart(date.toLocaleDateString('pt-BR'))}
            />
            <Spacer w={30} />
            <DatePickerInput
              placeholder='DD/MM/AAAA'
              text='DATA FIM'
              w={120}
              value={dataEnd}
              onChangeDate={(date) => setDataEnd(date.toLocaleDateString('pt-BR'))}
            />
          </View>
          {days ? (
            <View className='flex-row'>
              <View>
                <Line direction={false} w={17} />
                <Line w={48} />
              </View>
              <Text className='pl-[10px] pr-[10px] font-robotoThin text-[13px] font-[100] color-[#816B66] mt-[10px]'>{days + 'D'}</Text>
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
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <InputText
                singleLine
                header='ADCIONAR COMPETIDOR'
                text={selectedNicknames ? selectedNicknames : 'Chame os competidores...'}
                w={185}
              />
            </TouchableOpacity>
            <Spacer w={20} />
            <InputText text={`${selectedFriends?.size + 1}/8`} w={65} />
          </View>
          <Spacer h={25} />
          <SwitchButton value={onWeekends} onChangeSwitch={setOnWeekends} />
          <Spacer h={30} />
          <Line />
          <Spacer h={40} />
          <View>
            <Input text='SEQUÊNCIA DIÁRIA' placeholder='2 dias' w={160} onChangeText={setDareSequenceDay} value={dareSequenceDay} />
            <Spacer h={20} />
            <Input text='SEQUÊNCIA MENSAL' placeholder='2 mêses' w={160} onChangeText={setDareSequenceMounth} value={dareSequenceMounth} />
            <Spacer h={20} />
            <Input text='PONTOS POR DIA' placeholder='2 pts' w={160} onChangeText={setDareStreak} value={dareStreak} />
          </View>
          <Spacer h={30} />
          <ActionButton text='CRIAR DESAFIO' onPress={() => handleRegister()} />
        </View>
      </ScrollView>
      <Modal modal={showModal} onOpen={setShowModal}>
        <View className='h-[95%]'>
          {friends?.length > 0 && (
            <ScrollView className='w-full' showsVerticalScrollIndicator={false}>

              {friends?.map((friend: any) => {
                const profilePic = `${API_URL}/user/photo/${friend?._id}?timestamp=${new Date().getTime()}`;
                return (
                  <View key={friend._id} className='w-full flex-row items-center px-6 mt-5'>
                    <View className='flex-row items-center w-full justify-between'>
                      <View className='flex-row items-center'>
                        <ProfileButton w={60} h={60} profilePic={profilePic} />
                        <Spacer w={15} />
                        <View>
                          <Text className='font-cormorantSC text-[16px]'>{friend.nickname.toUpperCase()}</Text>
                          <View className='flex-row'>
                            <Text className='color-[#7C7F81] font-bold'>ID: </Text>
                            <Text className='font-robotoThin text-[13px] font-[100] color-[#816B66]'>
                              {friend.search_id}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <SmallButton pressed={selectedFriends.has(friend._id)} onPress={() => handleSelectFriend(friend?._id)}
                        icon={selectedFriends.has(friend._id) ? <Feather name='check-circle' size={16} color='#0058CB' /> : <MaterialIcons name="radio-button-unchecked" size={16} color="black" />} />
                    </View>
                    <Spacer h={50} />
                  </View>
                )
              })}
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  )
}
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

export default function CadastrarDesafio() {

  const { createDare } = dareHook()
  const { readFriends, user } = userHook()

  const [showModal, setShowModal] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState(new Set());

  const [dataStart, setDataStart] = useState('')
  const [dataEnd, setDataEnd] = useState('')
  const [onWeekends, setOnWeekends] = useState(true)
  const [days, setDays] = useState('')
  const [friends, setFriends] = useState<{ _id: string; nickname: string; search_id: string }[]>([])

  const [dareName, setDareName] = useState('')

  const [dareSequenceDay, setDareSequenceDay] = useState('')
  const [dareSequenceMounth, setDareSequenceMounth] = useState('')

  const [dareStreak, setDareStreak] = useState('')

  const selectedNicknames = friends
    .filter((f) => selectedFriends.has(f._id))
    .map((f) => f.nickname.toUpperCase())
    .join(', ');

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

    // const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    let businessDays = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay(); // 0 = Domingo, 6 = Sábado

      if (onWeekends || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
        businessDays++;
      }
    }

    setDays(businessDays.toString())
  };

  const handleRegister = async () => {
    console.log(dareName, dataStart, dataEnd, days, onWeekends, selectedFriends, user?.id, dareSequenceDay, dareSequenceMounth, dareStreak)
    const dareData = {
      name: dareName,
      startDate: dataStart,
      endDate: dataEnd,
      days: days,
      weekend: onWeekends,
      friends: Array.from(selectedFriends),
      host: user?.id,
      sequencyDay: dareSequenceDay,
      sequencyMounth: dareSequenceMounth,
      streak: dareStreak,
    }

    await createDare(dareData)

    setDareName('');
    setDataStart('');
    setDataEnd('');
    setDays('');
    setOnWeekends(true);
    setSelectedFriends(new Set());
    setDareSequenceDay('');
    setDareSequenceMounth('');
    setDareStreak('');
    setShowModal(false);

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
    getDiffDays()
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
          <SwitchButton onChangeSwitch={setOnWeekends} />
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
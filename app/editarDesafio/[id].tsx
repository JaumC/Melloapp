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
import { loadingHook } from '@/contexts/Providers/LoadingProvider'
import { useLocalSearchParams } from 'expo-router'
import { getDiffDays } from '@/utils/GetDifDays'

export default function EditarDesafio() {
  const { id } = useLocalSearchParams();

  const { readDare, updateDare, readChallengers } = dareHook()
  const { readFriends } = userHook()

  const { setLoading } = loadingHook()

  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [showModalDifDate, setShowModalDifDate] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState(new Set());

  const [newDataStart, setNewDataStart] = useState('')
  const [newDataEnd, setNewDataEnd] = useState('')

  const [oldDataStart, setOldDataStart] = useState('');
  const [oldDataEnd, setOldDataEnd] = useState('');

  const [dateChangeConfirmed, setDateChangeConfirmed] = useState(false);

  const [newOnWeekends, setNewOnWeekends] = useState(true)
  const [days, setDays] = useState('')
  const [newFriends, setNewFriends] = useState<any[]>([])

  const [newDareName, setNewDareName] = useState('')

  const [newDareSequenceDay, setNewDareSequenceDay] = useState('')
  const [newDareSequenceMounth, setNewDareSequenceMounth] = useState('')

  const [newDareStreak, setNewDareStreak] = useState('')

  const handleRegister = async () => {

    if (!dateChangeConfirmed && !checkDateChange()) return;

    const dareEditData = {
      name: newDareName,
      start_date: newDataStart,
      end_date: newDataEnd,
      days: days,
      weekend: newOnWeekends,
      challengers: Array.from(selectedFriends) as string[],
      day_sequency: newDareSequenceDay,
      mounth_sequency: newDareSequenceMounth,
      streak: newDareStreak,
    }

    await updateDare(dareEditData, id)

  }

  const addChallengers = async () => {
    const response: any = await readFriends('');
    setNewFriends(response);
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

  const checkDateChange = () => {
    if (newDataStart !== oldDataStart || newDataEnd !== oldDataEnd) {
      setShowModalDifDate(true)
      return false
    }
    handleRegister();
    return true
  };

  const getOneDare = async () => {
    setLoading(true);

    const response = await readDare(id.toString());
    const dare = response?.[0]?.dare;

    setNewDareName(dare?.name || '');
    setNewDataStart(dare?.start_date || '');
    setNewDataEnd(dare?.end_date || '');

    setOldDataStart(dare?.start_date || '');
    setOldDataEnd(dare?.end_date || '');

    setNewOnWeekends(dare?.weekend ?? true);
    setNewDareSequenceDay(dare?.day_sequency || '');
    setNewDareSequenceMounth(dare?.mounth_sequency || '');
    setNewDareStreak(dare?.streak || '');

    const challengers = dare?.challengers ?? []
    const fullFriends: any = await readFriends('');

    setNewFriends(fullFriends);
    const friendIds = new Set(challengers);
    setSelectedFriends(friendIds);

    setLoading(false);
  }


  useEffect(() => {
    if (id) {
      getOneDare()
    }
  }, [id])

  useEffect(() => {
    const businessDays = getDiffDays(newDataStart, newDataEnd, newOnWeekends) || '';
    setDays(businessDays);
  }, [newDataStart, newDataEnd, newOnWeekends]);


  useEffect(() => {
    addChallengers()
  }, [showModalUpdate])

  const [selectedNicknames, setSelectedNicknames] = useState<string>('');

  useEffect(() => {
    const nicknames = newFriends
      .filter((friend: any) => selectedFriends.has(friend._id))
      .map((friend: any) => friend?.nickname?.toUpperCase())
      .join(', ');
    setSelectedNicknames(nicknames);
  }, [newFriends, selectedFriends]);

  return (
    <View className='bg-[#fafafa] flex h-full w-full'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <View className='w-full h-full flex justify-center items-center'>
          <Spacer h={8} />
          <Text className="font-cormorantSC text-[24px] text-center">editar desafio</Text>
          <Spacer h={28} />
          <Input text='NOME DO DESAFIO' placeholder='Digite algo...' onChangeText={setNewDareName} value={newDareName} />
          <Spacer h={20} />
          <View className='flex-row'>
            <DatePickerInput
              text='DATA INÍCIO'
              placeholder='DD/MM/AAAA'
              w={120}
              value={newDataStart}
              onChangeDate={(date) => setNewDataStart(date.toLocaleDateString('pt-BR'))}
            />
            <Spacer w={30} />
            <DatePickerInput
              placeholder='DD/MM/AAAA'
              text='DATA FIM'
              w={120}
              value={newDataEnd}
              onChangeDate={(date) => setNewDataEnd(date.toLocaleDateString('pt-BR'))}
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
            <TouchableOpacity onPress={() => setShowModalUpdate(true)}>
              <InputText
                singleLine
                header='ADCIONAR COMPETIDOR'
                text={selectedNicknames || "Adicione seus amigos..."}
                w={185}
              />
            </TouchableOpacity>
            <Spacer w={20} />
            <InputText text={`${selectedFriends?.size + 1}/8`} w={65} />
          </View>
          <Spacer h={25} />
          <SwitchButton value={newOnWeekends} onChangeSwitch={setNewOnWeekends} />
          <Spacer h={30} />
          <Line />
          <Spacer h={40} />
          <View>
            <Input text='SEQUÊNCIA DIÁRIA' placeholder='2 dias' w={160} onChangeText={setNewDareSequenceDay} value={newDareSequenceDay} />
            <Spacer h={20} />
            <Input text='SEQUÊNCIA MENSAL' placeholder='2 mêses' w={160} onChangeText={setNewDareSequenceMounth} value={newDareSequenceMounth} />
            <Spacer h={20} />
            <Input text='PONTOS POR DIA' placeholder='2 pts' w={160} onChangeText={setNewDareStreak} value={newDareStreak} />
          </View>
          <Spacer h={30} />
          <ActionButton text='SALVAR ALTERAÇÕES' onPress={checkDateChange} />
        </View>
      </ScrollView>
      <Modal modal={showModalUpdate} onOpen={setShowModalUpdate}>
        <View className='h-[95%]'>
          {newFriends?.length > 0 && (
            <ScrollView className='w-full' showsVerticalScrollIndicator={false}>

              {newFriends?.map((friend: any, index: number) => {
                const profilePic = `${API_URL}/user/photo/${friend?._id}?timestamp=${new Date().getTime()}`;
                return (
                  <View key={index} className='w-full flex-row items-center px-6 mt-5'>
                    <View className='flex-row items-center w-full justify-between'>
                      <View className='flex-row items-center'>
                        <ProfileButton w={60} h={60} profilePic={profilePic} />
                        <Spacer w={15} />
                        <View>
                          <Text className='font-cormorantSC text-[16px]'>{friend?.nickname?.toUpperCase()}</Text>
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
      <Modal h={380} modal={showModalDifDate} onOpen={setShowModalDifDate}>
        <View className='h-[95%] flex items-center'>
          <Text className='font-cormorantSC text-[30px]'>atenção!</Text>
          <Spacer h={20} />
          <Line />
          <Spacer h={20} />
          <Text className='text-[20px]'>Ao alterar as datas: </Text>
          <Spacer h={20} />
          {newDataStart !== oldDataStart && (
            <>
              <View className='w-full flex flex-row gap-2 items-center justify-center'>
                <Text className='text-[18px] italic'>{oldDataStart}</Text>
                <Text>-{'>'}</Text>
                <Text className='text-[18px] font-bold'>{newDataStart}</Text>
              </View>
              <Spacer h={5} />
            </>
          )}
          {newDataEnd !== oldDataEnd && (
            <>
              <View className='w-full flex flex-row gap-2 items-center justify-center'>
                <Text className='text-[18px] italic'>{oldDataEnd}</Text>
                <Text>-{'>'}</Text>
                <Text className='text-[18px] font-bold'>{newDataEnd}</Text>
              </View>
            </>
          )}
          <Spacer h={35} />
          <Text className='text-center text-[18px]'>Os dados dos dias antigos serão <Text className='font-bold'>perdidos e resetados</Text>, deseja continuar?</Text>
          <Spacer h={20} />

          <View className='flex-row'>
            <ActionButton
              w={150}
              text='SIM'
              onPress={() => {
                setDateChangeConfirmed(true);
                setShowModalDifDate(false);
                handleRegister();
              }}
            />
            <Spacer w={15} />
            <ActionButton
              w={150}
              text='NÃO'
              color='red'
              onPress={() => {
                setShowModalDifDate(false);
                setNewDataStart(oldDataStart);
                setNewDataEnd(oldDataEnd);
              }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}
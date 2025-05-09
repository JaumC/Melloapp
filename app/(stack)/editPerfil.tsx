import { View, Text, StatusBar, Button, Modal, TouchableOpacity } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { ScrollView } from 'react-native-gesture-handler';

import { runOnJS } from 'react-native-reanimated';

import React, { useCallback, useState } from 'react';

import ProfileButton from '@/components/Buttons/ProfileButton';
import ActionButton from '@/components/Buttons/ActionButton';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import Line from '@/components/Line/Line';

import { useRouter, useFocusEffect } from 'expo-router';

import * as ImagePicker from "expo-image-picker";

import { API_URL } from '../../utils/API_URL';
import { notifyToast } from '@/utils/Toast';
import { userHook } from '@/contexts/Providers/UserProvider';

export default function EditPerfil() {
  const router = useRouter();
  const { updateUser, user } = userHook();

  const [showModal, setShowModal] = useState(false);

  const [newNick, setNewNick] = useState(user?.nickname || '');
  const [newColor, setNewColor] = useState(user?.color || '');
  const [newName, setNewName] = useState(user?.name || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newProfilePic, setNewProfilePic] = useState(user?.profilePic || '');

  const onSelectColor = ({ hex }: any) => {
    'worklet';
    runOnJS(setNewColor)(hex);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      notifyToast("error", "Erro", "É necessário permissão para acessar a galeria.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });

    if (!pickerResult.canceled) {
      setNewProfilePic(pickerResult.assets[0].uri);
    }
  };

  const handleEditUser = async () => {
    if (
      user?.name === newName &&
      user?.email === newEmail &&
      user?.nickname === newNick &&
      user?.profilePic === newProfilePic &&
      user?.color === newColor
    ) {
      notifyToast('info', 'Info', 'Não houve alterações.');
      return;
    }

    const updateData = new FormData();
    updateData.append("id", user?.id || "");
    updateData.append("name", newName);
    updateData.append("nickname", newNick);
    updateData.append("email", newEmail);
    updateData.append("color", newColor);

    if (newProfilePic) {
      updateData.append("file", {
        uri: newProfilePic,
        type: "image/jpeg",
        name: 'photo.jpg',
      } as any);
    }

    await updateUser(updateData);
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.profilePic) {
        setNewProfilePic(
          `${API_URL}/user/photo/${user?.id}?timestamp=${new Date().getTime()}`
        );
      }
    }, [])
  );

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center'>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <View className='flex-col items-center justify-center'>
          <Spacer h={45} />

          <Text className='font-cormorantSC text-[20px]'>perfil</Text>
          <Spacer h={24} />
          <View className='flex-row'>
            <ProfileButton profilePic={newProfilePic} onPress={pickImage} text='IMAGEM' />
          </View>
          <View className="absolute right-[70px] top-[105px] h-[40px] w-[40px] rounded-[12px] border p-[3px]">
            <TouchableOpacity
              style={{ backgroundColor: newColor }}
              className="h-full rounded-[10px] w-full"
              onPress={() => setShowModal(true)}
            />
            <Modal visible={showModal} animationType="slide" transparent={false}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ColorPicker
                  style={{ width: '90%' }}
                  value={newColor}
                  onComplete={onSelectColor}>
                  <Preview />
                  <Spacer h={4} />
                  <Panel1 />
                  <Spacer h={24} />
                  <HueSlider />
                  <Spacer h={24} />
                  <OpacitySlider />
                  <Spacer h={24} />
                  <Swatches />
                  <Spacer h={24} />
                </ColorPicker>
                <ActionButton text='SALVAR' onPress={() => setShowModal(false)} />
              </View>
            </Modal>
          </View>

          <Spacer h={60} />
          <Line />
          <Spacer h={25} />
          <Input text='NOME DE USUÁRIO' value={newNick} onChangeText={setNewNick} />
          <Spacer h={35} />
          <Input text='NOME' value={newName} onChangeText={setNewName} />
          <Spacer h={35} />
          <Input text='EMAIL' value={newEmail} onChangeText={setNewEmail} />

          <Spacer h={114} />
          <ActionButton text='RESETAR' color='#6E7687' onPress={() => router.back()} />
          <Spacer h={21} />
          <ActionButton text='SALVAR' onPress={handleEditUser} />
        </View>
      </ScrollView>

    </View>
  );
}

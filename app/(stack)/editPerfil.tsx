import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';

import ProfileButton from '@/components/Buttons/ProfileButton';
import ActionButton from '@/components/Buttons/ActionButton';
import Input from '@/components/Input/Input';
import Spacer from '@/components/Spacer/Spacer';
import Line from '@/components/Line/Line';

import { useRouter, useFocusEffect } from 'expo-router';

import * as ImagePicker from "expo-image-picker";
import ColorSelector from '../../components/ColorSelector/ColorSelector'

import { API_URL } from '../../utils/API_URL';
import { notifyToast } from '@/utils/Toast';
import { userHook } from '@/contexts/Providers/UserProvider';

export default function EditPerfil() {
  const router = useRouter();
  const { updateUser, user } = userHook();

  const [newNick, setNewNick] = useState(user?.nickname || '');
  const [newColor, setNewColor] = useState(user?.color || '');
  const [newName, setNewName] = useState(user?.name || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newProfilePic, setNewProfilePic] = useState(user?.profilePic || '');

  const [selectedColor, setSelectedColor] = useState(user?.color || '#ffffff');

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
          <View className='absolute right-[50px] top-[115px] border p-[4px]'>
            <ColorSelector
              selectedColor={selectedColor}
              setSelectedColor={(hex) => {
                setSelectedColor(hex);
                setNewColor(hex);
              }}
            />
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

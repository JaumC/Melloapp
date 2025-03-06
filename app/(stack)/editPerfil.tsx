import { View, Text, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import ProfileButton from '@/app/components/Buttons/ProfileButton';
import ActionButton from '@/app/components/Buttons/ActionButton';
import Input from '@/app/components/Input/Input';
import Spacer from '@/app/components/Spacer/Spacer';
import Line from '@/app/components/Line/Line';

import { useRouter, useGlobalSearchParams } from 'expo-router';
import { useSession } from '@/app/contexts/UserProvider';

import * as ImagePicker from "expo-image-picker";
import { API_URL } from '../utils/API_URL';
import { notifyToast } from '@/app/utils/Toast';
import Loading from '@/app/components/Loading/Loading';

export default function EditPerfil() {
  const router = useRouter();
  const { name, nick, email, profilePic }: any = useGlobalSearchParams();

  const [loading, setLoading] = useState(false);

  const [newNick, setNewNick] = useState(nick || '');
  const [newName, setNewName] = useState(name || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [newProfilePic, setNewProfilePic] = useState(profilePic || '');

  const { updateUser, user } = useSession();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
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
    setLoading(true);

    const updateData = new FormData();

    updateData.append("id", user?.id || "");
    updateData.append("name", newName);
    updateData.append("nickname", newNick);
    updateData.append("email", newEmail);

    if (newProfilePic) {
      updateData.append("file", {
        uri: newProfilePic,
        type: "image/jpeg",
        name: 'photo.jpg',
      } as any);
    }

    await updateUser(updateData);

    setLoading(false);
  };

  const imageUser = async () => {
    if (user && user.profilePic) {
    const imageUrl = `${API_URL}/user/photo/${user?.id}?timestamp=${new Date().getTime()}`;
      setNewProfilePic(imageUrl);
    }
  };

  useEffect(() => {
    setNewEmail(email || '');
    setNewNick(nick || '');
    setNewName(name || '');
  }, [nick, name, email]);

  useEffect(() => {
    imageUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center'>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <View className='flex-col items-center justify-center'>
          <Spacer h={45} />

          <Text className='font-cormorantSC text-[20px]'>perfil</Text>
          <Spacer h={24} />
          <View className='flex-row'>
            <ProfileButton profilePic={newProfilePic} onPress={() => pickImage()} text='IMAGEM' />
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
          <ActionButton text='SALVAR' onPress={() => handleEditUser()} />
        </View>
      </ScrollView>
    </View>
  );
}

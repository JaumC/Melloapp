import React from 'react'
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';

import { useRouter } from "expo-router";

import Spacer from '@/components/Spacer/Spacer';
import Line from '@/components/Line/Line';
import Input from '@/components/Input/Input';
import { API_URL } from '@/utils/Constants';
import ProfileButton from '@/components/Buttons/ProfileButton';
import SmallButton from '@/components/Buttons/SmallButton';

import Feather from '@expo/vector-icons/Feather';
import { userHook } from '@/contexts/Providers/UserProvider';

export default function MeusAmigos() {

  const router = useRouter();
  const [search, setSearch] = useState('');
  const [pressed, setPressed] = useState(new Set());

  const [friends, setFriends] = useState([])

  const { readFriends, removeFriend, user } = userHook();

  const searchFriends = async () => {
    const response: any = await readFriends(search);
    setFriends(response);
  };

  const handleRemoveFriend = async (userId: string) => {
    const isFriend = user?.friends?.includes(userId)

    setPressed((prev) => {
      const newSet = new Set(prev);

      if (isFriend) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });

    if (isFriend) {
      await removeFriend(userId);
      searchFriends()
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchFriends();
    }, 200);

    return () => clearTimeout(timeout);
  }, [search, user?.friends]);

  useEffect(() => {
    if (user?.friends?.length) {
      setPressed(new Set(user.friends))
    }
  }, [user])

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center'>
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
      <Spacer h={20} />
      <Text className="font-cormorantSC text-[24px] text-center">meus amigos</Text>
      <Input placeholder='ID ou Nome do Competidor' value={search} onChangeText={setSearch} />
      <Spacer h={25} />
      <Line />
      <Spacer h={15} />
      {friends?.length > 0 && (
        <ScrollView className='w-full' showsVerticalScrollIndicator={false}>
          {friends?.map((user: any) => {
            const profilePic = `${API_URL}/user/photo/${user?._id}?timestamp=${new Date().getTime()}`;
            return (
              <View key={user._id} className='w-full flex-row items-center px-12 mb-5'>
                <View className='flex-row items-center w-full justify-between'>
                  <View className='flex-row items-center'>
                    <ProfileButton w={60} h={60} profilePic={profilePic} />
                    <Spacer w={15} />
                    <View>
                      <Text className='font-cormorantSC text-[16px]'>{user.nickname.toUpperCase()}</Text>
                      <View className='flex-row'>
                        <Text className='color-[#7C7F81] font-bold'>ID: </Text>
                        <Text className='font-robotoThin text-[13px] font-[100] color-[#816B66]'>
                          {user.search_id}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <SmallButton pressed={pressed.has(user._id)} onPress={() => handleRemoveFriend(user?._id)} icon={<Feather name={pressed.has(user._id) ? 'user-check' : 'user-plus'} size={16} color={pressed.has(user._id) ? '#0058CB' : 'black'} />} />
                </View>

                <Spacer h={50} />
              </View>
            )
          })}
        </ScrollView>
      )}
    </View>
  );
}
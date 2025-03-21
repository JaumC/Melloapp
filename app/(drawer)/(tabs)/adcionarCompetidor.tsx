import { View, Text, ScrollView, StatusBar, Image } from 'react-native';
import { useEffect, useState } from 'react';

import { useRouter } from "expo-router";

import Spacer from '@/app/components/Spacer/Spacer';
import Line from '@/app/components/Line/Line';
import Input from '@/app/components/Input/Input';
import { userHook } from '@/app/contexts/UserProvider';
import { API_URL } from '@/app/utils/API_URL';
import ProfileButton from '@/app/components/Buttons/ProfileButton';
import SmallButton from '@/app/components/Buttons/SmallButton';


export default function AdcionarCompetidor() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const [ users, setUsers ] = useState([])
  const [ profilePic, setProfilePic ] = useState('')

  const { readAllUsers } = userHook();
  const searchUsers = async () => {
    if (search.trim() !== '') { 
      const response: any = await readAllUsers(search);
      setUsers(response);
      setProfilePic(`${API_URL}/user/photo/${response[0]?._id}?timestamp=${new Date().getTime()}`);
    } else {
      setUsers([]); 
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUsers();
    }, 500); 

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center justify-center'>
        <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
        <Spacer h={20} />
        <Text className="font-cormorantSC text-[24px] text-center">adcionar competidor</Text>   
        <Input placeholder='ID ou Nome do Competidor' value={search} onChangeText={setSearch}/>
        <Spacer h={25}/>
        <Line/>
        <Spacer h={15}/>
        {users?.length > 0 && (
          users?.map((user: any) => (
            <ScrollView key={user._id} showsVerticalScrollIndicator={false}>
              <View className='w-[300px] flex-row items-center'>
                <View className='flex-row items-center'>
                  <ProfileButton w={60} h={60} profilePic={profilePic}/>
                  <Spacer w={25}/>
                  <View>
                    <Text className='font-cormorantSC text-[16px]'>{user.nickname.toUpperCase()}</Text>
                    <Text className='font-robotoThin text-[13px] font-[100] color-[#816B66]'>
                      <Text className='color-[#7C7F81] font-bold'>ID: </Text> 
                      {user.search_id}
                    </Text>
                  </View>
                </View>
                <SmallButton/>
              </View>
            </ScrollView>
          ))
        )}
    </View>
  );
}
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';

import { useRouter } from "expo-router";

import Spacer from '@/app/components/Spacer/Spacer';
import Line from '@/app/components/Line/Line';
import Input from '@/app/components/Input/Input';
import { userHook } from '@/app/contexts/UserProvider';


export default function AdcionarCompetidor() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const [ users, setUsers ] = useState([])

  const { readAllUsers } = userHook();
  const searchUsers = async () => {
    const response: any = await readAllUsers(search)
    setUsers(response)
  }

  useEffect(() => {
    searchUsers()
    console.log('usersssss', users)
  }, [search])

  return (
    <View className='bg-[#fafafa] flex h-full w-full items-center justify-center'>
        <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
        <Spacer h={20} />
        <Text className="font-cormorantSC text-[24px] text-center">adcionar competidor</Text>       
        <Input placeholder='ID ou Nome do Competidor' value={search} onChangeText={setSearch}/>
        <Spacer h={25}/>
        <Line/>
        <Spacer h={15}/>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user: any) => (
            <ScrollView key={user._id} showsVerticalScrollIndicator={false}>
              <View className='flex-row justify-between'>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
              </View>
            </ScrollView>
          ))
        ) : (
          <Text>Nenhum usuário encontrado.</Text>
        )}
    </View>
  );
}
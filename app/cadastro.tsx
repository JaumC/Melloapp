import { useSession } from '@/app/contexts/UserProvider';

import { View, Text, ScrollView, StatusBar } from 'react-native'

import ActionButton from '@/app/components/Buttons/ActionButton'
import AddButton from '@/app/components/Buttons/AddButton'
import Loading from '@/app/components/Loading/Loading';
import Spacer from '@/app/components/Spacer/Spacer'
import Input from '@/app/components/Input/Input'
import Line from '@/app/components/Line/Line'

import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from 'uuid';

import React, { useState } from 'react'
import { notifyToast } from './utils/Toast';
import ProfileButton from './components/Buttons/ProfileButton';

export default function Cadastro() {
    const { createUser } = useSession();

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState<string>("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const pickImage = async() => {
        const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            notifyToast("error", "Erro", "É necessário permissão para acessar a galeria.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        })

        if(!pickerResult.canceled){
            setProfilePic(pickerResult.assets[0].uri)
            console.log('pickeeeeeeeer', profilePic)
        }
    }

    const handleRegister = async () => {
        setLoading(true);
    
        const data = {
            name: name,
            nick: nick,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            profilePic: {
                uri: profilePic,
                type: 'image/jpeg',
                name: `photo-${Date.now()}-${uuidv4().slice(0, 8)}.jpg`
            },
        };

        console.log('dataaaaaaaaaaaaaaaaaaaaaaa',data)
    
        await createUser(data);
    
        setLoading(false);
    };
    

    if (loading){
        return <Loading/>
    }

    return (
        <View className='bg-[#fafafa] h-full w-full'>
            <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
            <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
                <View className='flex items-center'>
                    <Spacer h={28}/>
                    <Text className='font-cormorantSC text-[24px] text-center'>CADASTRO</Text>
                    <Spacer h={20}/>
                    <View className='flex flex-row justify-center'>
                        {profilePic ? (
                            <ProfileButton profilePic={profilePic}/>    
                        ):(
                            <AddButton onPress={() => pickImage()} text='PERFIL'/>    
                        )}
                        <Spacer w={22}/>
                        <View>
                            <Spacer h={10}/>
                            <Input onChangeText={setNick} value={nick} w={193} text='NOME DE USUÁRIO' placeholder='Digite seu Nickname'/>
                        </View>
                        <Spacer h={20}/>
                    </View>
                    <Spacer h={15}/>
                    <Line/>
                    <Spacer h={30}/>
                    <Input onChangeText={setName} value={name} text='NOME' w={300} placeholder='Digite seu nome'/>
                    <Spacer h={20}/>
                    <Input onChangeText={setEmail} upper={false} value={email} text='EMAIL' w={300}  placeholder='Digite seu email'/>
                    <Spacer h={20}/>
                    <Input onChangeText={setPassword} upper={false} pass={true} value={password} text='SENHA' w={300} placeholder='Digite sua senha'/>
                    <Spacer h={20}/>
                    <Input onChangeText={setConfirmPassword} upper={false} pass={true} value={confirmPassword} text='CONFIRMAR SENHA' w={300} placeholder='Confirme sua senha'/>
                    <View>
                        <Spacer h={50}/>
                        <ActionButton w={300} text='CADASTRAR' onPress={() => handleRegister()}/>
                        <Spacer h={10}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
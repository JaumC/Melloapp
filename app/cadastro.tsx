
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'

import ActionButton from '@/components/Buttons/ActionButton'
import AddButton from '@/components/Buttons/AddButton'
import Spacer from '@/components/Spacer/Spacer'
import Input from '@/components/Input/Input'
import Line from '@/components/Line/Line'

import * as ImagePicker from "expo-image-picker";

import React, { useState } from 'react'
import { notifyToast } from '../utils/Toast';
import ProfileButton from '../components/Buttons/ProfileButton';
import { userHook } from '@/contexts/Providers/UserProvider'

export default function Cadastro() {
    const { createUser } = userHook();

    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState<string>("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const pickImage = async () => {
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

        if (!pickerResult.canceled) {
            setProfilePic(pickerResult.assets[0].uri)
        }
    }

    const handleRegister = async () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("nickname", nick);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("file", {
            uri: profilePic,
            type: "image/jpeg",
            name: 'photo.jpg',
        } as any);

        await createUser(formData);
    };

    return (
        <View className='bg-[#fafafa] h-full w-full'>
            <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
            <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
                <View className='flex items-center'>
                    <Spacer h={28} />
                    <Text className='font-cormorantSC text-[24px] text-center'>CADASTRO</Text>
                    <Spacer h={20} />
                    <TouchableOpacity className='flex flex-row justify-center'>
                        {profilePic ? (
                            <ProfileButton onPress={() => pickImage()} profilePic={profilePic} />
                        ) : (
                            <AddButton onPress={() => pickImage()} text='PERFIL' />
                        )}
                        <Spacer w={22} />
                        <View>
                            <Spacer h={10} />
                            <Input onChangeText={setNick} value={nick} w={193} text='NOME DE USUÁRIO' placeholder='Digite seu Nickname' />
                        </View>
                        <Spacer h={20} />
                    </TouchableOpacity>
                    <Spacer h={15} />
                    <Line />
                    <Spacer h={30} />
                    <Input onChangeText={setName} value={name} text='NOME' w={300} placeholder='Digite seu nome' />
                    <Spacer h={20} />
                    <Input onChangeText={setEmail} upper={false} value={email} text='EMAIL' w={300} placeholder='Digite seu email' />
                    <Spacer h={20} />
                    <Input onChangeText={setPassword} upper={false} pass={true} value={password} text='SENHA' w={300} placeholder='Digite sua senha' />
                    <Spacer h={20} />
                    <Input onChangeText={setConfirmPassword} upper={false} pass={true} value={confirmPassword} text='CONFIRMAR SENHA' w={300} placeholder='Confirme sua senha' />
                    <View>
                        <Spacer h={50} />
                        <ActionButton w={300} text='CADASTRAR' onPress={() => handleRegister()} />
                        <Spacer h={10} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
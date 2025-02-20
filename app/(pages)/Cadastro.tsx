import { UserContext } from '@/contexts/Providers/UserProvider';

import { View, Text, ScrollView } from 'react-native'

import ActionButton from '../(components)/ActionButton/ActionButton'
import AddButton from '../(components)/AddButton/AddButton'
import Spacer from '../(components)/Spacer/Spacer'
import Navbar from '../(components)/Navbar/Navbar'
import Input from '../(components)/Input/Input'
import Line from '../(components)/Line/Line'

import Feather from '@expo/vector-icons/Feather';

import React, { useContext, useState } from 'react'
import { useRouter } from 'expo-router';

export default function Cadastro() {
    const { createUser }: any = useContext(UserContext);

    const [nome, setNome] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('vazio');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const router = useRouter();

    const handleRegister = async() => {      

        const data = {
            name: nome,
            profilePic: profilePic,
            nick: nick,
            email: email,
            password: senha,
            confirmPassword: confirmarSenha
        }

        await createUser(data)
    }

    return (
        <View className='bg-[#fafafa] h-full w-full'>
            <Navbar onPress_fst={() => router.push('/')} icon_fst={<Feather name="chevron-left" size={24} color="#F7E5E2" />}/>
            <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
                <View className='flex items-center'>
                    <Spacer h={28}/>
                    <Text className='font-cormorantSC text-[24px] text-center'>CADASTRO</Text>
                    <Spacer h={20}/>
                    <View className='flex flex-row justify-center'>
                        <AddButton onPress={() => setProfilePic} text='PERFIL'/>    
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
                    <Input onChangeText={setNome} value={nome} text='NOME' w={300} placeholder='Digite seu nome'/>
                    <Spacer h={20}/>
                    <Input onChangeText={setEmail} upper={false} value={email} text='EMAIL' w={300}  placeholder='Digite seu email'/>
                    <Spacer h={20}/>
                    <Input onChangeText={setSenha} upper={false} pass={true} value={senha} text='SENHA' w={300} placeholder='Digite sua senha'/>
                    <Spacer h={20}/>
                    <Input onChangeText={setConfirmarSenha} upper={false} pass={true} value={confirmarSenha} text='CONFIRMAR SENHA' w={300} placeholder='Confirme sua senha'/>
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
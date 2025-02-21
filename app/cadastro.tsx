import { UserContext } from '@/contexts/Providers/UserProvider';

import { View, Text, ScrollView, StatusBar } from 'react-native'

import ActionButton from '@/app/components/Buttons/ActionButton'
import AddButton from '@/app/components/Buttons/AddButton'
import Spacer from '@/app/components/Spacer/Spacer'
import Input from '@/app/components/Input/Input'
import Line from '@/app/components/Line/Line'

import React, { useContext, useState } from 'react'

export default function Cadastro() {
    const { createUser }: any = useContext(UserContext);

    const [nome, setNome] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('vazio');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

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
            <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
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
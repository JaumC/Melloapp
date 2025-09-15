import Spacer from "@/components/Spacer/Spacer"
import { loadingHook } from "@/contexts/Providers/LoadingProvider"
import { userHook } from "@/contexts/Providers/UserProvider"
import React from "react"
import { View, ActivityIndicator, StatusBar, Text } from "react-native"

const Loading = () => {
    const { loading, bgVisible } = loadingHook()
    const { user } = userHook()

    if (!loading) return null

    return (
        <View style={{ opacity: bgVisible ? 0.5 : 1, backgroundColor: bgVisible ? 'black' : '#fafafa' }} className="absolute h-[100%] inset-0 bg-black justify-center items-center">
            <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
            {!bgVisible && (
                <>
                    <Text className='font-cormorantSC text-[70px]'>MELLO</Text>
                    {user && (
                        <>
                            <Spacer h={5} />
                            <View className="flex-col items-center">
                                <Text className='text-[15px]'> Bem vindo(a) <Text className="font-bold">{user?.nickname}</Text>!</Text>
                                <Spacer h={5} />
                                <Text> Estamos carregando seus desafios! 💪🏻</Text>

                            </View>
                        </>
                    )}
                    <Spacer h={80} />
                </>
            )}
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

export default Loading

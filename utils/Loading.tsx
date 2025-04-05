import React from "react"
import { View, ActivityIndicator, StatusBar } from "react-native"

const Loading = () => {
    return(
        <View className="absolute h-[100%] inset-0 bg-black opacity-50 justify-center items-center">
            <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    )
}

export default Loading

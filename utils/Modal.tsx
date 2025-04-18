import React from "react"
import { View, StatusBar, TouchableOpacity, Text, Pressable } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

interface ModalProps {
  modal?: boolean;
  children?: React.ReactNode;
  onOpen?: (modal: boolean) => void;
}

const Modal = ({ modal, children, onOpen }: ModalProps) => {
  if (!modal) return null;

  return (
    <View className="absolute inset-0 justify-center items-center z-50">
      <StatusBar barStyle="light-content" backgroundColor="#C4A59D" />

      <Pressable
        onPress={() => onOpen?.(false)}
        className="absolute inset-0 bg-black opacity-50"
      />

      <View className="bg-white h-[500px] w-[95%] rounded-lg z-50 p-4 pb-6">
        <TouchableOpacity onPress={() => onOpen?.(false)} className=" self-end">
          <Text className="text-red-500 font-bold">
              <AntDesign name="close" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        {children}
      </View>
    </View>
  );
};

export default Modal;

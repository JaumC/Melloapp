import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import ColorPicker, {Preview, Panel1, HueSlider } from 'reanimated-color-picker';

export default function ColorSelector({ selectedColor, setSelectedColor }: {
  selectedColor: string;
  setSelectedColor: (hex: string) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleColorChange = (color: { hex: string }) => {
    setSelectedColor(color.hex);
  };

  return (
    <View className="items-center">
      <Text className="mb-2 text-sm text-gray-600">Cor do perfil</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-10 h-10 rounded border border-gray-300"
        style={{ backgroundColor: selectedColor }}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/30">
          <View className="bg-white p-6 rounded-xl w-[90%] items-center">
            <Text className="text-lg mb-4">Escolha uma cor</Text>

            <ColorPicker
              value={selectedColor}
              onChange={handleColorChange}
              onComplete={() => setModalVisible(false)}
              thumbShape="circle"
              boundedThumb
              style={{ width: '100%' }}
            >
              <Preview />
              <Panel1 />
              <HueSlider />
            </ColorPicker>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-6"
            >
              <Text className="text-blue-600">Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

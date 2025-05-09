import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Spacer from '@/components/Spacer/Spacer';

interface SwitchButtonProps {
  value?: boolean;
  onChangeSwitch?: (text: boolean) => void
}

const SwitchButton = ({ onChangeSwitch, value }: SwitchButtonProps) => {
  const [isEnabled, setIsEnabled] = useState(value);

  useEffect(() => {
    setIsEnabled(value)
  }, [value])

  function toggleSwitch() {
    setIsEnabled((prev) => {
      const newValue = !prev;
      if (onChangeSwitch) {
        onChangeSwitch(newValue);
      }
      return newValue;
    });
  }

  return (
    <View className="flex justify-center items-center flex-row">
      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleSwitch}
        className="flex-row w-[60px] h-[30px] rounded-[15px] items-center"
        style={{
          backgroundColor: isEnabled ? '#499741' : '#C4A59D',
          justifyContent: isEnabled ? 'flex-end' : 'flex-start',
          paddingHorizontal: 5,
        }}
      >
        <View
          className="w-[23px] h-[23px] bg-[#FFFFFF] rounded-[15px]"
          style={{
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 2,
            elevation: 8,
          }}
        />
      </TouchableOpacity>
      <Spacer w={10} />
      <Text className="text-[13px] color-[#000] font-robotoThin">FINAL DE SEMANA</Text>
    </View>
  );
};

export default SwitchButton;

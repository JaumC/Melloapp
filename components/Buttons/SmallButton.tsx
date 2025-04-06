import React, { ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SmallButtonProps {
  icon?: ReactElement;
  onPress?: () => void;
  w?: number;
  h?: number;
  pressed?: boolean;
  color?: string;
}

const SmallButton = ({ icon, onPress, w = 40, h = 40, pressed = false, color = '#ADB4FF' }: SmallButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      {pressed ? (
        <LinearGradient
          colors={['#fff', color]}
          start={{ x: 1.3, y: 0.7 }}
          end={{ x: 1, y: 2 }}
          className="rounded-xl items-center justify-center overflow-hidden border"
          style={{
            width: w,
            height: h,
            borderColor: color,
          }}
        >
          {icon}
        </LinearGradient>
      ) : (
        <View
          className="rounded-xl items-center justify-center border border-black"
          style={{
            width: w,
            height: h,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 3,
          }}
        >
          {icon}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SmallButton;
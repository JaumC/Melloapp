import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const SwitchButton = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const thumbPosition = new Animated.Value(0); // Controla a posição do "thumb"
    
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
      Animated.timing(thumbPosition, {
        toValue: isEnabled ? 0 : 30, // Desloca a bolotinha
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>{isEnabled ? 'Ligado' : 'Desligado'}</Text>
        
        <TouchableOpacity
          style={{
            width: 60,
            height: 30,
            borderRadius: 20,
            backgroundColor: isEnabled ? '#499741' : '#C4A59D',
            justifyContent: 'center',
            padding: 5,
          }}
          onPress={toggleSwitch}
        >
          <Animated.View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#FFF9F9',
              transform: [{ translateX: thumbPosition }],
            }}
          />
        </TouchableOpacity>
        <Text className='font-robotoThin text-[13px] font-[700] color-[#816B66]'>FINAL DE SEMANA</Text>
      </View>
    );
  };

export default SwitchButton;

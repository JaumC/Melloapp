import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'

interface DatePickerInputProps {
  placeholder?: string
  onChangeDate?: (event: any, date?: Date) => void
  text?: string
  w?: number
  h?: number
}

const DatePickerInput = ({ w = 274, h = 40, text, placeholder, onChangeDate }: DatePickerInputProps) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDate = () => setShowPicker(!showPicker);

  const onChange = ({ type }: { type: string }, selectedDate: Date | undefined) => {
    if (type === 'set') {
      const currentDate: any = selectedDate;
      setDate(currentDate);
      toggleDate();
      if (onChangeDate) onChangeDate(currentDate); 
    } else {
      toggleDate();
    }
  };

  return (
    <View>
      <Text className="font-robotoThin text-[13px] font-[100] color-[#816B66] pl-[20px]">{text}</Text>
      {showPicker && (
        <DateTimePicker
          style={{ width: w, height: h }}
          mode="date"
          display="calendar"
          value={date}
          onChange={onChange}
        />
      )}
      {!showPicker && (
        <TouchableOpacity onPress={toggleDate}>
          <TextInput
            placeholder={placeholder}
            value={date.toLocaleDateString('pt-BR')}
            editable={false}
            placeholderTextColor="#C4A59D"
            className="outline-none border rounded-[20px] border-[#C4A59D] pl-[20px]"
            style={{ width: w, height: h }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DatePickerInput
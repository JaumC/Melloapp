import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'

interface DatePickerInputProps {
  placeholder?: string
  onChangeDate?: (date: Date) => void
  value?: string
  text?: string
  w?: number
  h?: number
}

const DatePickerInput = ({ w = 274, h = 40, text, placeholder, onChangeDate, value }: DatePickerInputProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const toggleDate = () => setShowPicker(!showPicker);

  const onChange = (_: any, selectedDate?: Date) => {
    toggleDate();
    if (selectedDate && onChangeDate) {
      onChangeDate(selectedDate);
    }
  };

  return (
    <View>
      <Text className="font-robotoThin text-[13px] font-[100] color-[#816B66] text-center">{text}</Text>
      {showPicker && (
        <DateTimePicker
          style={{ width: w, height: h }}
          mode="date"
          display="calendar"
          value={value ? parseDate(value) : new Date()}
          onChange={onChange}
        />
      )}
      {!showPicker && (
        <TouchableOpacity onPress={toggleDate}>
          <TextInput
            placeholder={placeholder}
            value={value}
            editable={false}
            placeholderTextColor="#C4A59D"
            className="outline-none border rounded-[20px] border-[#C4A59D] text-center"
            style={{ width: w, height: h }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Função auxiliar para converter string 'DD/MM/YYYY' para Date
const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

export default DatePickerInput
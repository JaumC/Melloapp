import { ApiResponse } from '@/utils/Typos';
import Toast from 'react-native-toast-message';

export const notifyToast = (type?: string, title?: string, message?: string) => {
    Toast.show({
        type: type,
        text1: title,
        text2: message,
        visibilityTime: 3500,
        autoHide: true,
        
    });
};

export const notifyApiToast = <T = any>(response: ApiResponse<T>) => {
  Toast.show({
    type: response.type,
    text1: response.title,
    text2: response.message,
    visibilityTime: 3500,
    autoHide: true,
  });
};
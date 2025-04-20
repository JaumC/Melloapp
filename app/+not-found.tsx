import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function NotFound() {

  const router = useRouter()

  return (
    <View className='mt-[200px] w-full flex justify-center items-center gap-6'>
      <Text className='text-[20px]'>Ops... Tela não encontrada!</Text>
      <TouchableOpacity onPress={() => router.push('/home')} >
        <Text className='text-[15px] text-blue-600 underline'>
          Voltar para Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

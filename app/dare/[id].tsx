import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function DarePage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>ID do desafio: {id}</Text>
    </View>
  );
}

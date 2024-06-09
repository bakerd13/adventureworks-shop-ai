import { View, Text, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { styles } from './navigationHeader.styles';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

const NavigationHeader = ({ title, theme }: { title: string, theme: ThemeEnum }) => {
  const router = useRouter();

  const goBack = () => {
    router.push('/');
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).buttonsContainer}>
        <Pressable onPress={() => goBack()} >
          <Ionicons name="arrow-back-outline" size={20} color={Theme[theme].iconColor} />
        </Pressable>
      </View>
      <View style={styles(theme).titleContainer}>
        <Text style={styles(theme).text}>{title}</Text>
      </View>
    </View>
  );
}

export default NavigationHeader;

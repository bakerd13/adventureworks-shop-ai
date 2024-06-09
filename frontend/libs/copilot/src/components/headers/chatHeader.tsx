import { View, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link } from 'expo-router';
import useCopilotStore from "../../stores/copilotStore";
import { styles } from './chatHeader.styles';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import useCopilotAccessoryStore from "../../stores/copilotAccessoryStore";
import { ICopilotAccessoryStore } from "../../types/copilotAccessoryStoreType";

const ChatHeader = ({ theme }: { theme: ThemeEnum }) => {
  const { setText, clearConversation } = useCopilotStore(state => state);

  const {
    volumeState,
    resetAccessoryState,
    setVolumeState,
  } = useCopilotAccessoryStore<ICopilotAccessoryStore>((state) => state);

  const clearMessage = () => {
    setText('');
  };

  const choiceVolume = () => {
    setVolumeState();
  };

  const choiceNewConversation = () => {
    resetAccessoryState();
    clearConversation();
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).buttonsContainer}>
      <Button
        containerStyle={styles(theme).button}
        theme={theme}
        onPress={() => choiceNewConversation()}
        name={'chat-plus'}
        type="MaterialCommunityIcons"
      />
      <Button
        containerStyle={styles(theme).button}
        theme={theme}
        onPress={() => choiceVolume()}
        name={volumeState ? 'volume-up' : 'volume-off'}
        type="MaterialIcons"
      />
      <Button
        containerStyle={styles(theme).button}
        theme={theme}
        onPress={() => clearMessage()}
        name="clear-all"
        type="MaterialIcons"
      />
        <Link href="/library" style={styles(theme).button} ><MaterialIcons name="my-library-books" size={20} color={Theme[theme].iconColor} /></Link>
        <Link href="/settings" style={styles(theme).button} ><MaterialIcons name={'settings'} size={20} color={Theme[theme].iconColor} /></Link>
      </View>
    </View>
  );
}

const renderIcon = ({
  type = 'MaterialIcons',
  size = 20,
  theme = ThemeEnum.Light,
  ...props
}) => {
  switch (type) {
    case 'Feather':
      return <Feather size={size} color={Theme[theme].iconColor} {...props} />;
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          size={size}
          color={Theme[theme].iconColor}
          {...props}
        />
      );
    default:
      return (
        <MaterialIcons size={size} color={Theme[theme].iconColor} {...props} />
      );
  }
};

const Button = ({
  containerStyle = {},
  onPress = () => {},
  type = 'MaterialIcons',
  size = 20,
  theme = ThemeEnum.Light,
  disabled = false,
  ...props
}) => (
  <Pressable style={containerStyle} onPress={onPress} disabled={disabled}>
    {renderIcon({ type, size, theme, ...props })}
  </Pressable>
);
export default ChatHeader;

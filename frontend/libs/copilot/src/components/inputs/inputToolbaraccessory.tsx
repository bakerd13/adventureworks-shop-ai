import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import {
  Pressable,
  StyleProp,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import useCopilotStore from '../../stores/copilotStore';
import {
  Author,
  MessageDTO,
  MessageType,
} from '../../types/messages';
import useCopilotAccessoryStore from '../../stores/copilotAccessoryStore';
import { ICopilotAccessoryStore } from '../../types/copilotAccessoryStoreType';
import { styles } from './inputToolbarAccessory.styles';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { Send } from './send';

export interface InputToolbarAccessoryProps {
  theme: ThemeEnum;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  disabled?: boolean;
  sendButtonProps?: Partial<TouchableOpacityProps>;
  onSend?(message: Partial<MessageDTO>, shouldResetInputToolbar: boolean): void;
}

const InputToolbarAccessory = ({
  theme = ThemeEnum.Light,
  containerStyle,
  children,
  disabled = false,
  sendButtonProps,
  onSend = () => {},
}: InputToolbarAccessoryProps) => {
  const { microphoneState, cameraState, setMicrophoneState, setCameraState } =
    useCopilotAccessoryStore<ICopilotAccessoryStore>((state) => state);
  const { text, setText, setConversationMessage, deleteConversationMessage } =
    useCopilotStore((state) => state);

  // @ts-ignore
  var recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();

  recognition.lang = 'en-GB';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 5;

  [
    'onend',
    // 'onerror',
    'onresult',
    'onspeechend',
    // 'onstart'
  ].forEach((eventName) => {
    switch (eventName) {
      case 'onresult':
        // @ts-ignore
        recognition[eventName] = (event: SpeechRecognitionEvent) => {
          const results = event.results as SpeechRecognitionResultList;

          const transcript = Array.from(results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');

          setText(`${text ?? ''} ${transcript}`);
        };
        break;
      case 'onend':
        // @ts-ignore
        recognition[eventName] = (event: SpeechRecognitionEvent) => {
          setMicrophoneState();
        };
        break;
      case 'onspeechend':
        // @ts-ignore
        recognition[eventName] = (event: SpeechRecognitionEvent) => {
          console.log('HERE onspeechend before onend:');
        };
        break;
    }
  });

  useEffect(() => {
    if (microphoneState) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [microphoneState]);

  const choiceMicrophone = () => {
    setMicrophoneState();
  };

  const choiceCamera = () => {
    if (!cameraState) {
      const cameraMessage: MessageDTO = {
        id: uuidv4(),
        messageType: MessageType.Camera,
        content: '',
        createdAt: new Date(),
        user: {
          id: Author.SYSTEM,
          name: 'camera',
        },
        conversationId: null,
        messageVariables: [],
      };
      setConversationMessage(cameraMessage);
    } else {
      deleteConversationMessage(MessageType.Camera);
    }

    setCameraState();
  };

  return (
    <View style={[styles(theme).container, containerStyle]}>
      <Button
        style={styles(theme).button}
        theme={theme}
        onPress={() => choiceCamera()}
        name={cameraState ? 'camera' : 'camera-off'}
        type="Feather"
      />
      <Button
        style={styles(theme).button}
        theme={theme}
        onPress={() => choiceMicrophone()}
        name={microphoneState ? 'microphone' : 'microphone-off'}
        type="MaterialCommunityIcons"
      />
      <Send
        theme={theme}
        text={text}
        onSend={onSend}
        containerStyle={styles(theme).button}
        children={children}
        sendButtonProps={sendButtonProps}
      />
    </View>
  );
};

const renderIcon = ({
  type = 'MaterialIcons',
  size = 16,
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
  onPress = () => {},
  type = 'MaterialIcons',
  size = 16,
  theme = ThemeEnum.Light,
  disabled = false,
  ...props
}) => (
  <Pressable onPress={onPress} disabled={disabled}>
    {renderIcon({ type, size, theme, ...props })}
  </Pressable>
);

export default InputToolbarAccessory;

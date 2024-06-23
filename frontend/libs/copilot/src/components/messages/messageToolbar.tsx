import { StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { LeftRightCenterStyle } from '../../types/models';
import { Position, PositionEnum } from '../../types/messageProps';
import { Author, LikeDTO, MessageDTO } from '../../types/messages';
import useCopilotStore from '../../stores/copilotStore';
import usePreferenceStore from '../../stores/preferenceStore';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';
import { useEffect, useState } from 'react';
import { GetTranslation } from '../../handlers/speechUtils';
import { Audio } from 'expo-av';

const { containerStyle } = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
});

const styles = {
  center: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
  }),
  left: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    button: {
      marginHorizontal: 5,
    },
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle,
    },
    button: {
      marginHorizontal: 5,
    },
  }),
};

export interface MessageToolbarProps {
  position?: Position;
  currentMessage?: MessageDTO;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
}

export const MessageToolbar = ({
  position = PositionEnum.Left,
  containerStyle,
  currentMessage,
}: MessageToolbarProps) => {
  const { updateConversationMessage } = useCopilotStore((state) => state);
  const theme = usePreferenceStore((state) => state.theme);
  const [speechState, setSpeechState] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    const fetchTranslation = async () => {
      if (speechState) {
        const sound = await GetTranslation(currentMessage?.content, currentMessage?.id);
        setSound(sound);
      } else {
        sound?.unloadAsync();
      }
    };
  
    fetchTranslation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speechState]);

  if (currentMessage?.user.id !== Author.ASSISTANT) {
    return null;
  }

  const setSpeech = () => {
    
    setSpeechState(!speechState);
    
  };

  const setLike = (like: boolean) => {
    currentMessage.like = like;
    updateLike({ id: currentMessage.id, conversationId: currentMessage.conversationId, like: like });
    updateConversationMessage(currentMessage);
  };

  const updateLike = async (like: LikeDTO): Promise<void> => {
    try {
      const url = `${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/messages/like`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Version': '1.0',
        },
        body: JSON.stringify(like),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (currentMessage.like === null) {
    return (<View
      style={[
        styles[position].container,
        containerStyle && containerStyle[position],
      ]}
    >
      <Pressable style={styles[position].button} onPress={() => setLike(true)}>
        <AntDesign name="like2" size={12} color={theme === ThemeEnum.Light ? "black" : "white"} />
      </Pressable>
      <Pressable style={styles[position].button} onPress={() => setLike(false)}>
        <AntDesign name="dislike2" size={12} color={theme === ThemeEnum.Light ? "black" : "white"} />
      </Pressable>
      <Pressable style={styles[position].button} onPress={() => setSpeech()}>
        <MaterialIcons name={speechState ? 'volume-up' : 'volume-off'} size={12} color={theme === ThemeEnum.Light ? "black" : "white"} />
      </Pressable>
    </View>);
  }

  return (
    <View
      style={[
        styles[position].container,
        containerStyle && containerStyle[position],
      ]}
    >
      <Pressable style={styles[position].button} onPress={() => setLike(true)}>
        {currentMessage.like ? <AntDesign name="like1" size={12} color="black" /> : <AntDesign name="like2" size={12} color="white" />}
      </Pressable>
      <Pressable style={styles[position].button} onPress={() => setLike(false)}>
        {!currentMessage.like ? <AntDesign name="dislike1" size={12} color="black" /> : <AntDesign name="dislike2" size={12} color="white" />}
      </Pressable>
    </View>
  );
};

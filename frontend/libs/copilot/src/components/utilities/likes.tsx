import { StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { LeftRightCenterStyle } from '../../types/models';
import { Position, PositionEnum } from '../../types/messageProps';
import { Author, LikeDTO, MessageDTO } from '../../types/messages';
import useCopilotStore from '../../stores/copilotStore';
import usePreferenceStore from '../../stores/preferenceStore';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

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

export interface LikesProps {
  position?: Position;
  currentMessage?: MessageDTO;
  containerStyle?: LeftRightCenterStyle<ViewStyle>;
}

export const Likes = ({
  position = PositionEnum.Left,
  containerStyle,
  currentMessage,
}: LikesProps) => {
  const { updateConversationMessage } = useCopilotStore((state) => state);
  const theme = usePreferenceStore((state) => state.theme);

  if (currentMessage?.user.id !== Author.ASSISTANT) {
    return null;
  }

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

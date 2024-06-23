
import {
  CopilotConversation,
  MessageDTO,
  MessageHandler,
  useCopilotStore,
  usePreferenceStore,
} from '@adventureworks/copilot';
import { Home } from '@adventureworks/copilot-features';

import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

const ConversationsIndex = () => {
  const { conversation } = useCopilotStore((state) => state);

  const { user } = usePreferenceStore((state) => state);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     console.log('HERE : ', user.id);
  //     const userResponse = await GetUser(user.id ?? uuidv4());
  //     console.log('HERE : ', userResponse);
  //     storeUser(userResponse);
  //   }
  //   console.log('HERE : ', user.id);
  //   if (!user.id) {
  //     console.log('HERE : ', user.id);
  //     fetchUser().catch(console.error);
  //   }
  // }, []);

  const onSend = useCallback(
    (message: MessageDTO) => {
      MessageHandler(message);
    },
    []
  );

  return (
    <View style={styles.chatContainer}>
      <CopilotConversation
        conversation={conversation}
        onSend={(message: MessageDTO) => onSend(message)}
        user={user}
        placeholder="Ask me...."
        disableComposer={false}
        showUserAvatar={true}
        customChatEmpty={() => <Home />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
});

export default ConversationsIndex;

import { ScrollView, View } from 'react-native';
import usePreferenceStore from '../../stores/preferenceStore';
import { useGetUserConversations } from '../../hooks/useGetUserConversations';
import ConversationCardView from './components/conversationCardView';

import { styles } from './libraryPanel.styles';

const LibraryPanel = () => {
  const { user, theme } = usePreferenceStore(state => state);
  const { data: conversationData, isLoading: conversationDataLoading, isError } = useGetUserConversations(user.id ?? '');

  if (conversationDataLoading || isError || conversationData?.length === 0) {
    return (<View style={styles(theme).container}></View>);
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles(theme).container}>
        <View style={styles(theme).cardGrid}>
          {conversationData &&
            conversationData.map((conversation, i) => {
              return (
                <ConversationCardView
                  conversation={conversation}
                  theme={theme}
                  key={i}
                />
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

export default LibraryPanel;

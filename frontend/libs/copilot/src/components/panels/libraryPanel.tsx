import { FlatList, ScrollView, View, useWindowDimensions } from 'react-native';
import usePreferenceStore from '../../stores/preferenceStore';
import { useGetUserConversations } from '../../hooks/useGetUserConversations';
import ConversationCardView from './components/conversationCardView';

import { styles } from './libraryPanel.styles';

const LibraryPanel = () => {
  const { user, theme } = usePreferenceStore(state => state);
  const { data: conversationData, isLoading: conversationDataLoading, isError } = useGetUserConversations(user.id ?? '');
  
    // Use useWindowDimensions for dynamic screen size
    const { width: screenWidth } = useWindowDimensions();
    // Assuming each card's base width is 200 pixels plus 32 pixels for margin/padding
    const cardBaseWidth = 232;
    const numColumns = Math.floor(screenWidth / cardBaseWidth);
  
  if (conversationDataLoading || isError || conversationData?.length === 0) {
    return (<View style={styles(theme).container}></View>);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles(theme).container}>
        <FlatList
          data={conversationData}
          renderItem={({ item: conversation, index }) => (
            <ConversationCardView
              conversation={conversation}
              theme={theme}
              key={index}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles(theme).cardGrid}
        />
      </View>
    </ScrollView>
  );
}

export default LibraryPanel;

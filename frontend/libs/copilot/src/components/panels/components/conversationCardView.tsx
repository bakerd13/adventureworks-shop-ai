import { View, Text, Pressable } from "react-native";
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import LoadConversationHandler from '../../../handlers/loadConversationHandler';
import DeleteConversationHandler from '../../../handlers/deleteConversationHandler';
import { ConversationListDTO } from "../../../types/messages";
import { useCopilotStore } from "../../../stores/copilotStore";
import { useCopilotContext } from '../../../contexts/copilotContext';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DATE_TIME_FORMAT } from '../../../constants';
import { Theme, ThemeEnum, queryCacheName, typography } from "@adventureworks.shop.ai.ui";

import { styles } from './conversationCardView.styles';
import { useRouter } from "expo-router";

const ConversationCardView = ({ conversation, theme }: { conversation: ConversationListDTO, theme: ThemeEnum }) => {
    const { setCurrentConversation } = useCopilotStore((state) => state);
    const router = useRouter();
    const queryClient = useQueryClient();
    const { getLocale } = useCopilotContext();

    const loadConversation = async (conversationId: string) => {
        const result = await LoadConversationHandler(conversationId);
        setCurrentConversation(result);
        router.dismissAll();
      }
    
      const deleteConversation = async (conversationId: string) => {
        await DeleteConversationHandler(conversationId);
        queryClient.invalidateQueries({ queryKey: [queryCacheName.CONVERSATIONS] });
      }

    return (
      <View style={styles(theme).container}>
        <View style={styles(theme).title}>
          <Text>{conversation.title}</Text>
        </View>

        <View style={styles(theme).infoWrapper}>
          <View style={styles(theme).infoSummary}>
            <Text style={typography.sizeXXS}>Created At: </Text>
            <Text style={typography.sizeXXS}>
              {dayjs(conversation.createdOn).locale(getLocale()).format(DATE_TIME_FORMAT)}
            </Text>
          </View>
          <View style={styles(theme).infoSummary}>
            <Text style={typography.sizeXXS}>Modified On: </Text>
            <Text style={typography.sizeXXS}>
              {dayjs(conversation.ModifiedOn).locale(getLocale()).format(DATE_TIME_FORMAT)}
            </Text>
          </View>
        </View>

        <View style={styles(theme).buttonWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable style={styles(theme).button} onPress={() => loadConversation(conversation?.id)}>
              <Ionicons name="reload" size={16} color={Theme[theme].cardIconColor} />
            </Pressable>
            <Pressable style={styles(theme).button} onPress={() => deleteConversation(conversation?.id ?? 0)}>
              <AntDesign name={'delete'} size={16} color={Theme[theme].cardIconColor} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  
  export default ConversationCardView;
  
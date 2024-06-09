import { useQuery } from '@tanstack/react-query';
import { ConversationListDTO } from '../types/messages';
import { queryCacheName, queryStaleTimes } from '@adventureworks.shop.ai.ui';

export const useGetUserConversations = (userId: string) => {
  return useQuery({
    queryKey: [queryCacheName.CONVERSATIONS],
    queryFn: () => GetUserConversations(userId),
    staleTime: queryStaleTimes.TWENTY_FOUR_HOURS,
  });
};

const GetUserConversations = async (
  userId: string
): Promise<ConversationListDTO[] | null> => {
  try {
    const url = `${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/conversations/${userId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': '1.0',
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result as ConversationListDTO[];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

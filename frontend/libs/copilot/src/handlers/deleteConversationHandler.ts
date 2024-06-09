const DeleteConversationHandler = async (conversationId: string) => {
  try {
    const response = await responseHandler(conversationId);
    return response;
  } catch (error) {
    console.error('Error saving conversation:', error);
    throw error;
  }
};

const responseHandler = async (conversationId: string) => {
  try {
    const url = `${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/conversations/${conversationId}`;
    const options = {
      method: 'DELETE',
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
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default DeleteConversationHandler;

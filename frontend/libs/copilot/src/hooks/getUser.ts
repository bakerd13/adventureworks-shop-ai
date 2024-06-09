import { UserDTO } from '../types/messages';

const GetUser = async (
  userId: string
): Promise<UserDTO> => {
  try {
    console.log('HERE : ', userId);
    const url = `${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/users/${userId}`;
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

    return result as UserDTO[];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default GetUser;

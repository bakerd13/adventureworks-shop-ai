import { MessageProps } from '../../../copilot/src/types/messageProps';
import { ReactNode } from 'react';
import { MessageDTO } from '../../../copilot/src/types/messages';
import { View } from 'react-native';

const FeatureTypeHandler = (
  messageProps: MessageProps<MessageDTO>
): ReactNode => {
  const content = JSON.parse(messageProps.currentMessage?.content ?? '');

  switch (content.featureType) {
    default:
      return <View />;
  }
};

export default FeatureTypeHandler;

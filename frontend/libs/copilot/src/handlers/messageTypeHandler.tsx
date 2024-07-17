import { MessageProps } from '../types/messageProps';
import { ReactNode } from 'react';
import Camera from '../components/cameras/camera';
import { MessageDTO, MessageType } from '../types/messages';
import { MessageText } from '../components/messages/text/messageText';
import { MessageMarkdownContent } from '../components/messages/markdown/messageMarkdownContent';
import MessageComponent from '../components/messages/messageComponent';
import { MessageHtmlContent } from '../components/messages/html/messageHtmlContent';

const MessageTypeHandler = (
  messageProps: MessageProps<MessageDTO>
): ReactNode => {
  switch (messageProps.currentMessage?.messageType) {
    case MessageType.Message:
      return (<MessageComponent {...messageProps}>
                <MessageText {...messageProps} />
              </MessageComponent>
          );

    case MessageType.Markdown:
      return (<MessageComponent {...messageProps}>
                <MessageMarkdownContent {...messageProps} />
              </MessageComponent>
            );

    case MessageType.Html:
      return (<MessageComponent {...messageProps}>
                <MessageHtmlContent {...messageProps} />
              </MessageComponent>
            );

    case MessageType.Camera:
      return <Camera {...messageProps} />;

    // deepcode ignore DuplicateCaseBody: <please specify a reason of ignoring this>
    default:
      return (<MessageComponent {...messageProps}>
        <MessageText {...messageProps} />
      </MessageComponent>
);
  }
};

export default MessageTypeHandler;

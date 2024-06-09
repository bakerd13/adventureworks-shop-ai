import React, { RefObject } from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ListViewProps,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { warning } from '../../utils/logging';
import MessageTypeHandler from '../../handlers/messageTypeHandler';
import { MessageDTO, UserDTO } from '../../types/messages';

import { styles } from './messageContainer.styles';
import {
  LayoutEnum,
  LayoutType,
} from '../../stores/preferenceStore';
import GetItemPosition from '../utilities/positionItemUtil';
import { ThemeEnum } from '@adventureworks.shop.ai.ui';

export interface MessageContainerProps {
  messages?: MessageDTO[];
  user?: UserDTO;
  theme: ThemeEnum;
  layout: LayoutType;
  listViewProps: Partial<ListViewProps>;
  scrollToBottom?: boolean;
  scrollToBottomStyle?: StyleProp<ViewStyle>;
  invertibleScrollViewProps?: any;
  extraData?: any;
  scrollToBottomOffset?: number;
  forwardRef?: RefObject<FlatList<MessageDTO>>;
  customChatEmpty?(): React.ReactNode;
  scrollToBottomComponent?(): React.ReactNode;
  infiniteScroll?: boolean;
}

interface State {
  showScrollBottom: boolean;
  hasScrolled: boolean;
}

export default class MessageContainer<
  TMessage extends MessageDTO = MessageDTO
> extends React.PureComponent<MessageContainerProps, State> {
  static defaultProps = {
    messages: [],
    user: {},
    theme: ThemeEnum.Light,
    layout: LayoutEnum.Stacked,
    customChatEmpty: null,
    renderMessage: null,
    listViewProps: {},
    invertibleScrollViewProps: {},
    extraData: null,
    scrollToBottom: false,
    scrollToBottomOffset: 200,
    scrollToBottomStyle: {},
    infiniteScroll: false,
  };

  state = {
    showScrollBottom: false,
    hasScrolled: false,
  };

  scrollTo(options: { animated?: boolean; offset: number }) {
    if (this.props.forwardRef && this.props.forwardRef.current && options) {
      this.props.forwardRef.current.scrollToOffset(options);
    }
  }

  scrollToBottom = (animated = true) => {
    if (this.props.forwardRef && this.props.forwardRef.current) {
      this.props.forwardRef!.current!.scrollToEnd({ animated });
    }
  };

  handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        contentOffset: { y: contentOffsetY },
        contentSize: { height: contentSizeHeight },
        layoutMeasurement: { height: layoutMeasurementHeight },
      },
    } = event;
    const { scrollToBottomOffset } = this.props;

    if (
      contentOffsetY < scrollToBottomOffset! &&
      contentSizeHeight - layoutMeasurementHeight > scrollToBottomOffset!
    ) {
      this.setState({ showScrollBottom: true, hasScrolled: true });
    } else {
      this.setState({ showScrollBottom: false, hasScrolled: true });
    }
  };

  renderRow = ({ item, index }: ListRenderItemInfo<TMessage>) => {
    if (!item.id) {
      warning(
        'CopilotConversation: `message id` is missing for message',
        JSON.stringify(item)
      );
    }
    if (!item.user) {
      item.user = { id: '' };
    }
    const { messages, user, layout, ...restProps } = this.props;
    if (messages && user) {
      const previousMessage = messages[index - 1] || {};
      const nextMessage = messages[index + 1] || {};

      const messageProps = {
        ...restProps,
        user,
        key: item.id,
        currentMessage: item,
        previousMessage,
        nextMessage,
        position: GetItemPosition(item.user.id, user.id, layout),
      };

      return MessageTypeHandler(messageProps);
    }
    return null;
  };

  renderChatEmpty = () => {
    if (this.props.customChatEmpty) {
      return (
        <View style={styles(this.props.theme).emptyChatContainer}>
          {this.props.customChatEmpty()}
        </View>
      );
    }
    return <View style={styles(this.props.theme).container} />;
  };

  renderScrollBottomComponent() {
    const { scrollToBottomComponent } = this.props;

    if (scrollToBottomComponent) {
      return scrollToBottomComponent();
    }

    return <Text>V</Text>;
  }

  renderScrollToBottomWrapper() {
    const propsStyle = this.props.scrollToBottomStyle || {};
    return (
      <View style={[styles(this.props.theme).scrollToBottomStyle, propsStyle]}>
        <TouchableOpacity
          onPress={() => this.scrollToBottom()}
          hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
        >
          {this.renderScrollBottomComponent()}
        </TouchableOpacity>
      </View>
    );
  }

  onLayoutList = () => {
    if (!!this.props.messages && this.props.messages!.length) {
      setTimeout(
        () => this.scrollToBottom && this.scrollToBottom(false),
        15 * this.props.messages!.length
      );
    }
  };

  keyExtractor = (item: MessageDTO) => {
    return `${item.id}`;
  };

  render() {
    return (
      <View style={styles(this.props.theme).container}>
        <FlatList
          ref={this.props.forwardRef}
          extraData={[this.props.extraData]}
          keyExtractor={this.keyExtractor}
          enableEmptySections
          automaticallyAdjustContentInsets={false}
          data={this.props.messages}
          style={styles(this.props.theme).listStyle}
          contentContainerStyle={styles(this.props.theme).contentContainerStyle}
          renderItem={this.renderRow}
          {...this.props.invertibleScrollViewProps}
          ListEmptyComponent={this.renderChatEmpty}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={100}
          onLayout={this.onLayoutList}
          onEndReachedThreshold={0.1}
          {...this.props.listViewProps}
        />
        {this.state.showScrollBottom && this.props.scrollToBottom
          ? this.renderScrollToBottomWrapper()
          : null}
      </View>
    );
  }
}

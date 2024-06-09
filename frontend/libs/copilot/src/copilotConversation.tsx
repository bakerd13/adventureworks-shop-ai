import {
  ActionSheetOptions,
  ActionSheetProvider,
  ActionSheetProviderRef,
} from '@expo/react-native-action-sheet';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { LightboxProps } from 'react-native-lightbox-v2';
import { v4 as uuidv4 } from 'uuid';
import { ActionsProps } from './components/actions';
import {
  MAX_COMPOSER_HEIGHT,
  MIN_COMPOSER_HEIGHT,
  MIN_HEADER_HEIGHT,
  TEST_ID,
} from './constants';
import { CopilotContext } from './contexts/copilotContext';
import { InputToolbar } from './components/inputs/inputToolbar';
import MessageContainer from './components/messages/messageContainer';
import { LeftRightCenterStyle } from './types/models';
import useCopilotStore from './stores/copilotStore';
import {
  Author,
  ConversationDTO,
  MessageDTO,
  MessageType,
  UserDTO,
} from './types/messages';
import { styles } from './copilotConversation.styles';
import ChatHeader from './components/headers/chatHeader';
import usePreferenceStore from './stores/preferenceStore';

dayjs.extend(localizedFormat);

export interface CopilotConversationProps {
  conversation: ConversationDTO;
  /* enables the scrollToBottom Component */
  scrollToBottom?: boolean;
  /* Scroll to bottom wrapper style */
  scrollToBottomStyle?: StyleProp<ViewStyle>;
  /* Placeholder when text is empty; default is 'Type a message...' */
  placeholder?: string;
  /* Makes the composer not editable*/
  disableComposer?: boolean;
  /* User sending the messages: { id, name, avatar } */
  user?: UserDTO;
  /*  Locale to localize the dates */
  locale?: string;
  /* Whether to render an avatar for the current user; default is false, only show avatars for other users */
  showUserAvatar?: boolean;
  /* TODO Determine whether to handle keyboard awareness inside the plugin. If you have your own keyboard handling outside the plugin set this to false; default is true */
  isKeyboardInternallyHandled?: boolean;

  /*Extra props to be passed to the MessageImage's Lightbox */
  lightboxProps?: LightboxProps;
  /*Distance of the chat from the bottom of the screen (e.g. useful if you display a tab bar) */
  bottomOffset?: number;
  /*Extra props to be passed to the messages <ListView>; some props can't be overridden, see the code in MessageContainer.render() for details */
  listViewProps?: any;
  /*  Extra props to be passed to the <TextInput> */
  textInputProps?: any;
  /*Determines whether the keyboard should stay visible after a tap; see <ScrollView> docs */
  keyboardShouldPersistTaps?: any;
  /*Max message composer TextInput length */
  maxInputLength?: number;
  /* Force getting keyboard height to fix some display issues */
  forceGetKeyboardHeight?: boolean;
  /* Image style */
  imageStyle?: StyleProp<ViewStyle>;
  /* This can be used to pass any data which needs to be re-rendered */
  extraData?: any;
  /* composer min Height */
  minComposerHeight?: number;
  /* composer min Height */
  maxComposerHeight?: number;
  options?: { [key: string]: any };
  optionTintColor?: string;
  /* infinite scroll up when reach the top of messages container */
  infiniteScroll?: boolean;
  timeTextStyle?: LeftRightCenterStyle<TextStyle>;
  /* Custom action sheet */
  actionSheet?(): {
    showActionSheetWithOptions: (
      options: ActionSheetOptions,
      callback: (i: number) => void
    ) => void;
  };
  /* Callback when a message avatar is tapped */
  onPressAvatar?(user: UserDTO): void;
  /* Callback when a message avatar is tapped */
  onLongPressAvatar?(user: UserDTO): void;
  /* Callback when sending a message */
  onSend?(message: MessageDTO): void;
  /*  Render a loading view when initializing */
  renderLoading?(): React.ReactNode;
  /* Callback when a message bubble is pressed; default is to do nothing */
  onPress?(context: any, message: MessageDTO): void;
  /* Callback when a message bubble is long-pressed; default is to show an ActionSheet with "Copy Text" (see example using showActionSheetWithOptions()) */
  onLongPress?(context: any, message: MessageDTO): void;
  /* Custom component to render in the ListView when messages are empty */
  customChatEmpty?(): React.ReactNode;
  /* Custom action button on the left of the message composer */
  customActions?(props: ActionsProps): React.ReactNode;
  /*Callback when the Action button is pressed (if set, the default actionSheet will not be used) */
  onPressActionButton?(): void;
  /* Scroll to bottom custom component */
  scrollToBottomComponent?(): React.ReactNode;
}

export interface CopilotConversationState {
  isInitialized: boolean;
  composerHeight?: number;
  messagesContainerHeight?: number | Animated.Value;
  typingDisabled: boolean;
  text?: string;
  conversation?: ConversationDTO;
}

const CopilotConversation = (props: CopilotConversationProps) => {
  const {
    conversation = { id: null, messages: [] },
    user = { id: Author.USER },
    onSend = () => {},
    locale = 'en',
    renderLoading = null,
    actionSheet = null,
    textInputProps = {},
    isKeyboardInternallyHandled = true,
    bottomOffset = null,
    keyboardShouldPersistTaps = Platform.select({
      ios: 'never',
      android: 'always',
      default: 'never',
    }),
    maxInputLength = null,
    forceGetKeyboardHeight = false,
    minComposerHeight = MIN_COMPOSER_HEIGHT,
    maxComposerHeight = MAX_COMPOSER_HEIGHT,
  } = props;

  const initialText = '';
  const messageContainerRef = useRef<FlatList<MessageDTO>>();
  const textInputRef = useRef<TextInput>();
  const isMountedRef = useRef(false);
  const keyboardHeightRef = useRef(0);
  const bottomOffsetRef = useRef(0);
  const maxHeightRef = useRef<number | undefined>(undefined);
  const isFirstLayoutRef = useRef(true);
  const actionSheetRef = useRef<ActionSheetProviderRef>(null);

  let _isTextInputWasFocused = false;

  const { messagesUpdateCount, text, setText } = useCopilotStore(
    (state) => state
  );
  const { theme, layout } = usePreferenceStore((state) => state);

  const [state, setState] = useState<CopilotConversationState>({
    isInitialized: false, // initialization will calculate maxHeight before rendering the chat
    composerHeight: minComposerHeight,
    messagesContainerHeight: undefined,
    typingDisabled: false,
    conversation,
  });

  useEffect(() => {
    isMountedRef.current = true;

    setState({
      ...state,
      conversation,
    });

    if (conversation.messages?.length) {
      setTimeout(() => scrollToBottom(false), 200);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [conversation, messagesUpdateCount, text]);

  const getTextFromProp = (fallback: string) => {
    if (text === undefined) {
      return fallback;
    }

    return text;
  };

  const getKeyboardHeight = () => {
    if (Platform.OS === 'android' && !forceGetKeyboardHeight) {
      // For android: on-screen keyboard resized main container and has own height.
      // @see https://developer.android.com/training/keyboard-input/visibility.html
      // So for calculate the messages container height ignore keyboard height.
      return 0;
    }

    return keyboardHeightRef.current;
  };

  const calculateMessagesHeight = (composerHeight: number) => {
    return composerHeight + MIN_HEADER_HEIGHT;
  };

  /**
   * Returns the height, based on current window size, without taking the keyboard into account.
   */
  const getBasicMessagesContainerHeight = (
    composerHeight = state.composerHeight
  ) => {
    return maxHeightRef.current! - calculateMessagesHeight(composerHeight!);
  };

  /**
   * Returns the height, based on current window size, taking the keyboard into account.
   */
  const getMessagesContainerHeightWithKeyboard = (
    composerHeight = state.composerHeight
  ) => {
    return (
      getBasicMessagesContainerHeight(composerHeight) -
      getKeyboardHeight() +
      bottomOffsetRef.current
    );
  };

  /**
   * Store text input focus status when keyboard hide to retrieve
   * it after wards if needed.
   * `onKeyboardWillHide` may be called twice in sequence so we
   * make a guard condition (eg. showing image picker)
   */
  const handleTextInputFocusWhenKeyboardHide = () => {
    if (!_isTextInputWasFocused) {
      _isTextInputWasFocused = textInputRef.current?.isFocused() || false;
    }
  };

  /**
   * Refocus the text input only if it was focused before showing keyboard.
   * This is needed in some cases (eg. showing image picker).
   */
  const handleTextInputFocusWhenKeyboardShow = () => {
    if (
      textInputRef.current &&
      _isTextInputWasFocused &&
      !textInputRef.current.isFocused()
    ) {
      textInputRef.current.focus();
    }

    // Reset the indicator since the keyboard is shown
    _isTextInputWasFocused = false;
  };

  const onKeyboardWillShow = (e: any) => {
    handleTextInputFocusWhenKeyboardShow();

    if (isKeyboardInternallyHandled) {
      keyboardHeightRef.current = e.endCoordinates
        ? e.endCoordinates.height
        : e.end.height;

      bottomOffsetRef.current = bottomOffset != null ? bottomOffset : 1;

      const newMessagesContainerHeight =
        getMessagesContainerHeightWithKeyboard();

      setState({
        ...state,
        typingDisabled: true,
        messagesContainerHeight: newMessagesContainerHeight,
      });
    }
  };

  const onKeyboardWillHide = (_e: any) => {
    handleTextInputFocusWhenKeyboardHide();

    if (isKeyboardInternallyHandled) {
      keyboardHeightRef.current = 0;
      bottomOffsetRef.current = 0;

      const newMessagesContainerHeight = getBasicMessagesContainerHeight();

      setState({
        ...state,
        typingDisabled: true,
        messagesContainerHeight: newMessagesContainerHeight,
      });
    }
  };

  const onKeyboardDidShow = (e: any) => {
    if (Platform.OS === 'android') {
      onKeyboardWillShow(e);
    }

    setState({
      ...state,
      typingDisabled: false,
    });
  };

  const onKeyboardDidHide = (e: any) => {
    if (Platform.OS === 'android') {
      onKeyboardWillHide(e);
    }

    setState({
      ...state,
      typingDisabled: false,
    });
  };

  const scrollToBottom = (animated = true) => {
    if (messageContainerRef?.current) {
      messageContainerRef.current.scrollToEnd({ animated });
    }
  };

  const renderMessages = () => {
    const { ...messagesContainerProps } = props;
    const fragment = (
      <View
        style={[
          typeof state.messagesContainerHeight === 'number' && {
            height: state.messagesContainerHeight,
          },
        ]}
      >
        <MessageContainer
          theme={theme}
          {...messagesContainerProps}
          layout={layout}
          invertibleScrollViewProps={{
            keyboardShouldPersistTaps: keyboardShouldPersistTaps,
            onKeyboardWillShow: onKeyboardWillShow,
            onKeyboardWillHide: onKeyboardWillHide,
            onKeyboardDidShow: onKeyboardDidShow,
            onKeyboardDidHide: onKeyboardDidHide,
          }}
          messages={state.conversation?.messages}
          forwardRef={messageContainerRef}
        />
      </View>
    );

    return isKeyboardInternallyHandled ? (
      <KeyboardAvoidingView enabled>{fragment}</KeyboardAvoidingView>
    ) : (
      fragment
    );
  };

  const send = (message: MessageDTO, shouldResetInputToolbar = false) => {
    const newMessage: MessageDTO = {
      ...message,
      id: uuidv4(),
      messageType: MessageType.Message,
      user: user,
      createdAt: new Date(),
      conversationId: state.conversation?.id ?? null,
      like: null,
    };

    if (shouldResetInputToolbar === true) {
      setState({
        ...state,
        typingDisabled: true,
      });

      resetInputToolbar();
    }

    if (onSend) {
      onSend(newMessage);
    }
  };

  const resetInputToolbar = () => {
    if (textInputRef.current) {
      textInputRef.current.clear();
    }

    const newMessagesContainerHeight =
      getMessagesContainerHeightWithKeyboard(minComposerHeight);

    setState({
      ...state,
      text: getTextFromProp(''),
      composerHeight: minComposerHeight,
      messagesContainerHeight: newMessagesContainerHeight,
    });
  };

  const onInputSizeChanged = (size: { height: number }) => {
    const newComposerHeight = Math.max(
      minComposerHeight,
      Math.min(maxComposerHeight, size.height)
    );

    const newMessagesContainerHeight =
      getMessagesContainerHeightWithKeyboard(newComposerHeight);

    setState({
      ...state,
      composerHeight: newComposerHeight,
      messagesContainerHeight: newMessagesContainerHeight,
    });
  };

  const inputTextChanged = (textChanged: string) => {
    if (state.typingDisabled) {
      return;
    }
    setText(textChanged);
  };

  const onInitialLayoutViewLayout = (e: any) => {
    const { layout } = e.nativeEvent;

    if (layout.height <= 0) {
      return;
    }

    maxHeightRef.current = layout.height;

    const newMessagesContainerHeight =
      getMessagesContainerHeightWithKeyboard(minComposerHeight);

    setState({
      ...state,
      isInitialized: true,
      text: getTextFromProp(initialText),
      composerHeight: minComposerHeight,
      messagesContainerHeight: newMessagesContainerHeight,
    });
  };

  const onMainViewLayout = (e: LayoutChangeEvent) => {
    // TODO: fix an issue when keyboard is dismissing during the initialization
    const { layout } = e.nativeEvent;

    if (
      maxHeightRef.current !== layout.height ||
      isFirstLayoutRef.current === true
    ) {
      maxHeightRef.current = layout.height;

      setState({
        ...state,
        messagesContainerHeight:
          keyboardHeightRef.current > 0
            ? getMessagesContainerHeightWithKeyboard()
            : getBasicMessagesContainerHeight(),
      });
    }

    if (isFirstLayoutRef.current === true) {
      isFirstLayoutRef.current = false;
    }
  };

  const _renderLoading = () => {
    if (renderLoading) {
      return renderLoading();
    }

    return null;
  };

  const renderInputToolbar = () => {
    const inputToolbarProps = {
      ...props,
      text,
      composerHeight: Math.max(minComposerHeight, state.composerHeight!),
      onSend: send,
      onInputSizeChanged: onInputSizeChanged,
      onTextChanged: inputTextChanged,
      textInputProps: {
        ...textInputProps,
        ref: textInputRef,
        maxLength: state.typingDisabled ? 0 : maxInputLength,
      },
    };

    return <InputToolbar theme={theme} {...inputToolbarProps} />;
  };

  const contextValues = useMemo(
    () => ({
      actionSheet: actionSheet || (() => actionSheetRef.current?.getContext()!),
      getLocale: () => locale,
    }),
    [actionSheet, locale]
  );

  if (state.isInitialized === true) {
    return (
      <CopilotContext.Provider value={contextValues}>
        <View testID={TEST_ID.WRAPPER} style={styles(theme).wrapper}>
          <ActionSheetProvider ref={actionSheetRef}>
            <View style={styles(theme).container} onLayout={onMainViewLayout}>
              <ChatHeader theme={theme} />
              {renderMessages()}
              {renderInputToolbar()}
            </View>
          </ActionSheetProvider>
        </View>
      </CopilotContext.Provider>
    );
  }

  return (
    <View
      testID={TEST_ID.LOADING_WRAPPER}
      style={styles(theme).container}
      onLayout={onInitialLayoutViewLayout}
    >
      {_renderLoading()}
    </View>
  );
};

export default CopilotConversation;

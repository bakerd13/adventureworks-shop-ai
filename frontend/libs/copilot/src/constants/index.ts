import { Platform } from 'react-native';

export const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
  web: 44,
}) ?? 44;

export const MIN_TOOLBAR_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
  web: 50,
}) ?? 50;

export const MIN_HEADER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
  web: 50,
}) ?? 50;

export const MAX_COMPOSER_HEIGHT = 200;
export const DEFAULT_PLACEHOLDER = 'Type a message...';
export const DATE_FORMAT = 'll';
export const TIME_FORMAT = 'LT';
export const DATE_TIME_FORMAT = 'lll';

export const SPEECH_WORD_CHUNK = 50;

export const TEST_ID = {
  WRAPPER: 'GC_WRAPPER',
  LOADING_WRAPPER: 'GC_LOADING_CONTAINER',
  SEND_TOUCHABLE: 'GC_SEND_TOUCHABLE',
};

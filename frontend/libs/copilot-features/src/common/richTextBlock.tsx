import { RichTextBlockContentItem as RichTextBlockContentItemType } from '../types/richTextBlockContentItem';
import { Platform, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { colors } from '../constants';

const tagsStyles = {
  body: { fontSize: 16, color: colors.ColorMonoPrimaryLight },
  b: { fontWeight: '500' },
  strong: { fontStyle: 'italic' },
  i: { fontStyle: 'italic' },
  em: { fontStyle: 'italic' },
  u: { textDecorationLine: 'underline' },
  pre: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  code: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  a: {
    fontWeight: '500',
    color: '#007AFF',
  },
  h1: { fontWeight: '500', fontSize: 36 },
  h2: { fontWeight: '500', fontSize: 30 },
  h3: { fontWeight: '500', fontSize: 24 },
  h4: { fontWeight: '500', fontSize: 18 },
  h5: { fontWeight: '500', fontSize: 14 },
  h6: { fontWeight: '500', fontSize: 12 },
} as const;

const RichTextBlock = ({ text, baseStyle }: RichTextBlockContentItemType): JSX.Element => {
  const { width } = useWindowDimensions();

  return <RenderHtml
    contentWidth={width}
    source={{ html: text }}
    baseStyle={baseStyle}
    tagsStyles={tagsStyles}
    enableExperimentalMarginCollapsing={true}
    />;
}

export default RichTextBlock;

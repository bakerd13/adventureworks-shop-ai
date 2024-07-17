import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';
import { Platform, StyleSheet } from 'react-native';
/**
 * Defines the styles for the Markdown content in the message component.
 * The styles are organized into three main categories: center, left, and right alignment.
 * Each category has its own set of styles for the container, text, link, and image elements.
 * Additionally, there are styles defined for various Markdown elements such as headings, horizontal rules, emphasis, blockquotes, lists, code, tables, and links.
 * The styles are generated based on the provided theme (ThemeEnum) and use the Theme object to determine the appropriate font color.
 */

const { textStyle } = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },
});

export const styles = {
  center: (theme: ThemeEnum) =>
    StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
      },
      text: {
        color: Theme[theme].fontColor,
        ...textStyle,
      },
      link: {
        color: Theme[theme].fontColor,
        textDecorationLine: 'underline',
      },
      image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginTop: 5,
      },
    }),
  left: (theme: ThemeEnum) =>
    StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
      },
      text: {
        color: Theme[theme].fontColor,
        ...textStyle,
      },
      link: {
        color: Theme[theme].fontColor,
        textDecorationLine: 'underline',
      },
      image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginTop: 5,
      },
    }),
  right: (theme: ThemeEnum) =>
    StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
      },
      text: {
        color: Theme[theme].fontColor,
        ...textStyle,
      },
      link: {
        color: Theme[theme].fontColor,
        textDecorationLine: 'underline',
      },
      image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginTop: 5,
      },
    }),
};

export const tagsStyles = (theme: ThemeEnum) => {
  return {
    body: { fontSize: 16, color: Theme[theme].fontColor, margin: 0, padding: 0, border: 0 },
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
};

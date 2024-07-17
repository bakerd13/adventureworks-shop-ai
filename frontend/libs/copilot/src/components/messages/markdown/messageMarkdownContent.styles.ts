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

// this is converted to a stylesheet internally at run time with StyleSheet.create(
export const markdownStyles = (theme: ThemeEnum) =>
  StyleSheet.create({
    // The main container
    body: {},

    // Headings
    heading1: {
      flexDirection: 'row',
      fontSize: 32,
      color: Theme[theme].fontColor,
    },
    heading2: {
      flexDirection: 'row',
      fontSize: 24,
      color: Theme[theme].fontColor,
    },
    heading3: {
      flexDirection: 'row',
      fontSize: 18,
      color: Theme[theme].fontColor,
    },
    heading4: {
      flexDirection: 'row',
      fontSize: 16,
      color: Theme[theme].fontColor,
    },
    heading5: {
      flexDirection: 'row',
      fontSize: 13,
      color: Theme[theme].fontColor,
    },
    heading6: {
      flexDirection: 'row',
      fontSize: 11,
      color: Theme[theme].fontColor,
    },

    // Horizontal Rule
    hr: {
      backgroundColor: '#000000',
      height: 1,
    },

    // Emphasis
    strong: {
      fontWeight: 'bold',
    },
    em: {
      fontStyle: 'italic',
    },
    s: {
      textDecorationLine: 'line-through',
    },

    // Blockquotes
    blockquote: {
      backgroundColor: '#F5F5F5',
      borderColor: '#CCC',
      borderLeftWidth: 4,
      marginLeft: 5,
      paddingHorizontal: 5,
    },

    // Lists
    bullet_list: {
      color: Theme[theme].fontColor,
    },
    ordered_list: {
      color: Theme[theme].fontColor,
    },
    list_item: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_content: {
      flex: 1,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_content: {
      flex: 1,
    },

    // Code
    code_inline: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 4,
      ...Platform.select({
        ['ios']: {
          fontFamily: 'Courier',
        },
        ['android']: {
          fontFamily: 'monospace',
        },
      }),
    },
    code_block: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 4,
      ...Platform.select({
        ['ios']: {
          fontFamily: 'Courier',
        },
        ['android']: {
          fontFamily: 'monospace',
        },
      }),
    },
    fence: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 4,
      ...Platform.select({
        ['ios']: {
          fontFamily: 'Courier',
        },
        ['android']: {
          fontFamily: 'monospace',
        },
      }),
    },

    // Tables
    table: {
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 3,
    },
    thead: {},
    tbody: {},
    th: {
      flex: 1,
      padding: 5,
    },
    tr: {
      borderBottomWidth: 1,
      borderColor: '#000000',
      flexDirection: 'row',
    },
    td: {
      flex: 1,
      padding: 5,
    },

    // Links
    link: {
      textDecorationLine: 'underline',
    },
    blocklink: {
      flex: 1,
      borderColor: '#000000',
      borderBottomWidth: 1,
    },

    // Images
    image: {
      flex: 1,
    },

    // Text Output
    text: {
      color: Theme[theme].fontColor,
    },
    textgroup: {},
    paragraph: {
      marginTop: 10,
      marginBottom: 10,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
    },
    hardbreak: {
      width: '100%',
      height: 1,
    },
    softbreak: {},

    // Believe these are never used but retained for completeness
    pre: {},
    inline: {},
    span: {},
  });

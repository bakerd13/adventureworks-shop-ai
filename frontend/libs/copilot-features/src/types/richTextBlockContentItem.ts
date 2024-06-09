import { MixedStyleDeclaration } from "react-native-render-html";

enum NestedContentBlockType {
  TEXT_BLOCK = 'TextBlock',
  RICH_TEXT_BLOCK = 'RichTextBlock',
  LIST_BLOCK = 'ListBlock',
  LEARNING_CONTENT_CARD_LIST_ITEM = 'LearningContentCardListItem',
}

export type NestedContentItemBase = {
  _type?: NestedContentBlockType;
};

export type RichTextBlockContentItem = {
  text: string;
  title?: string;
  dataTestid?: string;
  baseStyle?: MixedStyleDeclaration | undefined;
} & NestedContentItemBase;

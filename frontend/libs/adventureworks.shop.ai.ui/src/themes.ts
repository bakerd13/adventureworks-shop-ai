export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}

export type ThemeType = {
    backgroundColor: string;
    borderColor: string;
    iconColor: string;
    textboxColor: string;
    assistantBackgroundColor: string;
    headerBarColor: string;
    trackColor: { false: string, true: string };
    fontColor: string;
    buttonFontColor: string;
    cardBackgroundColor: string;
    cardIconColor: string;
    cardFontColor: string;
  };

export interface ThemeCollection {
  [ThemeEnum.Light]: ThemeType;
  [ThemeEnum.Dark]: ThemeType;
};

export const Theme: ThemeCollection = {
  [ThemeEnum.Light]: {
    backgroundColor: '#F8F8F8',
    borderColor: '#d8d8d6',
    iconColor: '#333333',
    textboxColor: '#F8F8F8',
    assistantBackgroundColor: '#F8F8F8',
    headerBarColor: '#F8F8F8',
    trackColor: { false: '#000', true: '#000' },
    fontColor: 'black',
    buttonFontColor: '#F8F8F8',
    cardBackgroundColor: '#F8F8F8',
    cardIconColor: '#CCCCCC',
    cardFontColor: '#CCCCCC',
  },
  [ThemeEnum.Dark]: {
    backgroundColor: '#333333',
    borderColor: '#464C55',
    iconColor: '#CCCCCC',
    textboxColor: '#464C55',
    assistantBackgroundColor: '#444444',
    headerBarColor: '#464C55',
    trackColor: { false: '#000', true: '#000' },
    fontColor: '#CCCCCC',
    buttonFontColor: '#CCCCCC',
    cardBackgroundColor: '#CCCCCC',
    cardIconColor: '#333333',
    cardFontColor: '#333333',
  }
} as const;

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
    thumbColor: string;
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
    backgroundColor: '#FAFAFA',
    borderColor: '#E0E0E0',
    iconColor: '#505050',
    textboxColor: '#FFFFFF',
    assistantBackgroundColor: '#EFEFEF',
    headerBarColor: '#EAEAEA',
    trackColor: { false: '#000', true: '#282C34' },
    thumbColor: '#282C34',
    fontColor: '#000000',
    buttonFontColor: '#FFFFFF',
    cardBackgroundColor: '#FFFFFF',
    cardIconColor: '#666666',
    cardFontColor: '#666666',
  },
  [ThemeEnum.Dark]: {
    backgroundColor: '#282C34',
    borderColor: '#525960',
    iconColor: '#BBBBBB',
    textboxColor: '#464C55',
    assistantBackgroundColor: '#2C2F33',
    headerBarColor: '#3C4043',
    trackColor: { false: '#000', true: '#FAFAFA' },
    thumbColor: '#FAFAFA',
    fontColor: '#E0E0E0',
    buttonFontColor: '#CCCCCC',
    cardBackgroundColor: '#3C4043',
    cardIconColor: '#AAAAAA',
    cardFontColor: '#AAAAAA',
  }
} as const;

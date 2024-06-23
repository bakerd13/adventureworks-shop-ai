import { View, Text, Switch, ScrollView } from 'react-native';
import { styles } from './settingsPanel.styles';
import { LayoutEnum, usePreferenceStore } from '../../stores/preferenceStore';
import { Theme, ThemeEnum } from '@adventureworks.shop.ai.ui';

const SettingsPanel = () => {
  const { theme, layout, setTheme, setLayout } = usePreferenceStore(state => state);

  const toggleTheme = (value: boolean) => {
    setTheme(value ? ThemeEnum.Dark : ThemeEnum.Light);
  };

  const toggleLayout = (value: boolean) => {
    setLayout(value ? LayoutEnum.Staggered : LayoutEnum.Stacked);
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles(theme).container}>
        <View style={styles(theme).settingsContainer}>
          <View style={styles(theme).textContainer}>
            <Text style={styles(theme).title}>
              This is a theme setting option, you can change between light and
              dark modes
            </Text>
          </View>
          <View style={styles(theme).switchContainer}>
            <Switch
              style={styles(theme).switch}
              trackColor={Theme[theme].trackColor}
              thumbColor={theme === 'dark' ? '#5fdd4b' : '#4ff3f4'}
              ios_backgroundColor="#3e3e3e"
              value={theme === ThemeEnum.Dark ? true : false}
              onValueChange={toggleTheme}
            />
          </View>
        </View>
        <View style={styles(theme).settingsContainer}>
          <View style={styles(theme).textContainer}>
            <Text style={styles(theme).title}>
              You can set the way that messages are displayed, either in a
              stacked format or a basic column format
            </Text>
          </View>
          <View style={styles(theme).switchContainer}>
            <Switch
              style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
              trackColor={Theme[theme].trackColor}
              thumbColor={theme === 'dark' ? '#5fdd4b' : '#4ff3f4'}
              ios_backgroundColor="#3e3e3e"
              value={layout === LayoutEnum.Staggered ? true : false}
              onValueChange={toggleLayout}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SettingsPanel;

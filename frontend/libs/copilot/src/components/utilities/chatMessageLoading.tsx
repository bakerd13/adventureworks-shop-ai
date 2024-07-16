import { ThemeEnum } from '@adventureworks.shop.ai.ui';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { View, StyleSheet } from 'react-native';

export const ChatMessageLoading = ({ theme }: { theme: ThemeEnum }) => {
  return (
    <MotiView
    transition={{
      type: 'timing',
    }}
    style={[styles.container, styles.padded]}
    animate={{ backgroundColor: 'Transparent' }}
  >
    <Skeleton colorMode={theme} width={'75%'} />
    <Spacer height={8} />
    <Skeleton colorMode={theme} width={'100%'} />
    <Spacer height={8} />
    <Skeleton colorMode={theme} width={'100%'} />
  </MotiView>
  );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  padded: {
    padding: 16,
  },
});

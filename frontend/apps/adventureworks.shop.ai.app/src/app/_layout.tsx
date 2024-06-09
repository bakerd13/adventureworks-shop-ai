import { SplashScreen, Stack } from 'expo-router';
import { QueryClient } from '@tanstack/react-query';
import Head from 'expo-router/head';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
// import { useAssets } from 'expo-asset';
import React, { useEffect } from 'react';
import { NavigationHeader, QueryProvider, usePreferenceStore } from '@adventureworks/copilot';

const queryClient = new QueryClient();

const ConversationLayout = () => {
  const theme  = usePreferenceStore((state) => state.theme);
  // const [assets] = useAssets([
  //   require('@adventureworks-shop-ai-assets/assets/fonts/fonts.css'),
  // ]);

  const fontMap = {
    RobotoRegular: require('@adventureworks-shop-ai-assets/assets/fonts/roboto/Roboto-Regular.ttf'),
    RobotoBold: require('@adventureworks-shop-ai-assets/assets/fonts/roboto/Roboto-Medium.ttf'),
    RobotoLightItalic: require('@adventureworks-shop-ai-assets/assets/fonts/roboto/Roboto-LightItalic.ttf'),
    RobotoItalic: require('@adventureworks-shop-ai-assets/assets/fonts/roboto/Roboto-Italic.ttf'),
    RobotoLight: require('@adventureworks-shop-ai-assets/assets/fonts/roboto/Roboto-Light.ttf'),
    TiemposHeadlineRegular: require('@adventureworks-shop-ai-assets/assets/fonts/tiempos-headline/regular/TiemposHeadline-Regular.ttf'),
    TiemposHeadlineBold: require('@adventureworks-shop-ai-assets/assets/fonts/tiempos-headline/bold/TiemposHeadline-Bold.ttf'),
    TiemposTextRegular: require('@adventureworks-shop-ai-assets/assets/fonts/tiempos-text/regular/TIEMPOSTEXT-REGULAR.ttf'),
    TiemposTextSemiBold: require('@adventureworks-shop-ai-assets/assets/fonts/tiempos-text/semi/TiemposText-SemiBold.ttf'),
    TiemposTextRegularItalic: require('@adventureworks-shop-ai-assets/assets/fonts/tiempos-text/regular/TiemposText-RegularItalic.ttf'),
    TiemposTextSemiBoldItalic: require('@adventureworks-shop-ai-assets/assets/fonts/tiempos-text/semi/TiemposText-SemiBoldItalic.ttf'),
  };

  const [loaded, error] = useFonts(fontMap);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <>
      <Head>
        <title>AdventureWorks.AI</title>
        <meta name="description" content="AdventureWorks Shop AI" />
        {/* {assets && <link href={assets[0].uri as string} rel="stylesheet" />} */}
      </Head>
      <QueryProvider queryClient={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="library"
              options={{     
                headerShown: true,
                header: (props) => <NavigationHeader title='Library' theme={theme}/>,
              }}
            />
            <Stack.Screen
              name="settings"
              options={{     
                headerShown: true,
                header: (props) => <NavigationHeader title='Settings' theme={theme}/>,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </QueryProvider>
    </>
  );
};

export default ConversationLayout;

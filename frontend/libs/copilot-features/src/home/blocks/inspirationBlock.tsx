import { Image } from 'expo-image';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import useDeviceSize from '../../hooks/useDeviceSize';
import RichTextBlock from '../../common/richTextBlock';
import { colors, fonts } from '../../constants';

const imageWidth = 480;

const inpsiration = {
  title: 'Connect with the wild',
  text: 'When you feeling down take a break and spend time in your local forest enjoying the views, seeing the birds and the wildlife.',
  image: {
    src: './assets/images/defaultDailyInspiration.jpeg',
  },
};

const InpsirationBlock = () => {
  const { width, isMobileWidth, isTabletWidth, isDesktopWidth } =
    useDeviceSize();

  return (
    <View
      style={[
        styles.container,
        isMobileWidth ? styles.containerMobile : {},
        isTabletWidth ? styles.containerTablet : {},
        isDesktopWidth ? styles.containerDesktop : {},
      ]}
    >
      <View
        style={[
          styles.block,
          isTabletWidth ? [styles.blockTablet] : [],
          isTabletWidth ? [{ width: width - imageWidth }] : [],
        ]}
      >
        <Text style={[styles.titleText, styles.whiteText]}>
          For your inspiration
        </Text>
        <View>
          <Text
            style={[styles.subHeadingText, styles.topMargin, styles.whiteText]}
          >
            {inpsiration?.title}
          </Text>
          <RichTextBlock
            text={inpsiration?.text ?? ''}
          />
        </View>
      </View>
      <Image
        style={styles.image}
        contentFit="cover"
        source={{ uri: `${inpsiration?.image.src}` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 648,
    backgroundColor: colors.ColorRed400,
  },
  containerMobile: {
    minHeight: 534,
  },
  containerTablet: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 400,
  },
  containerDesktop: {
    flex: 1,
  },
  block: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 32,
  },
  blockTablet: {
    paddingTop: 64,
    paddingBottom: 64,
  },
  topMargin: {
    marginTop: 16,
  },
  titleText: {
    fontSize: 64,
    fontFamily: fonts.SANS_SERIF,
  },
  subHeadingText: {
    fontSize: 24,
  },
  bodyText: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 14,
  },
  button: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.ColorMonoPrimaryLight,
  },
  whiteText: {
    color: colors.ColorMonoPrimaryLight,
  },
  imageWrapper: {
    minHeight: 320,
  },
  image: {
    flex: 1,
    width: '100%',
    minHeight: 240,
    backgroundColor: '#0553',
  },
});

export default InpsirationBlock;

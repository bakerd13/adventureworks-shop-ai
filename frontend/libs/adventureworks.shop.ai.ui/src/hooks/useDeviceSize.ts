import { useWindowDimensions } from 'react-native';

type DeviceSize = {
  /** The width of the window */
  width: number;
  /** The height of the window */
  height: number;
  /** Returns true if the window width is >= 375px */
  isMobileWidth: boolean;
  /** Returns true if the window width is >= 768px */
  isTabletWidth: boolean;
  /** Returns true if the window width is >= 1024px */
  isDesktopWidth: boolean;
  /** Returns true if the window width is >= 1440px */
  isLargeDesktopWidth: boolean;
};

/**
 * useDeviceState returns the width and height of the current window
 * as well as computed flags for standardised screen breakpoints,
 * all styling should be mobile first (>= 320px) and then use the provided
 * flags to add additional styling for larger devices:
 * - isMobileWidth: (>= 375px)
 * - isTabletWidth: (>= 768px)
 * - isDesktopWidth: (>= 1024px)
 * - isLargeDesktopWidth: (>= 1440px)
 * @returns {DeviceSize} The device/window size data
 */
const useDeviceSize = (): DeviceSize => {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isMobileWidth: width >= 375,
    isTabletWidth: width >= 768,
    isDesktopWidth: width >= 1024,
    isLargeDesktopWidth: width >= 1440,
  };
}

export default useDeviceSize;

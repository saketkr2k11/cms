import {Dimensions, PixelRatio} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isTablet = DeviceInfo.isTablet();
const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const DesignHeight: number = isTablet ? 744 : 812;
const DesignWidth: number = isTablet ? 1133 : 360;

export const getScreenHeight = (): number => Dimensions.get('screen').height;
export const getScreenWidth = (): number => Dimensions.get('screen').width;

const viewWidth = (width: number): number => {
  if (!width) {
    throw new Error('Width must present');
  }

  // Parse string percentage input and convert it to number.
  const percent: number = (width / DesignWidth) * 100;
  const elemWidth: number = parseFloat(percent + '%');

  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const viewHeight = (height: number): number => {
  if (!height) {
    throw new Error('Height must present');
  }

  // Parse string percentage input and convert it to number.
  const percent: number = (height / DesignHeight) * 100;
  const elemHeight: number = parseFloat(percent + '%');

  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export default {
  screenWidth,
  screenHeight,
  viewHeight,
  viewWidth,
  getScreenHeight,
  getScreenWidth,
};

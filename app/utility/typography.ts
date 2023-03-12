import {RFValue} from 'react-native-responsive-fontsize';
import {ITypography} from '../lib/types';
import DeviceInfo from 'react-native-device-info';
import {getScreenHeight, getScreenWidth} from './dimensions';

const isTablet = DeviceInfo.isTablet();
const baseHeight = getScreenHeight();
const baseWidth = getScreenWidth();

const fontSize = {
  tiny: isTablet
    ? Number(RFValue(10, baseWidth).toFixed(2))
    : Number(RFValue(10, baseHeight).toFixed(2)),
  normal: isTablet
    ? Number(RFValue(12, baseWidth).toFixed(2))
    : Number(RFValue(12, baseHeight).toFixed(2)),
  small: isTablet
    ? Number(RFValue(14, baseWidth).toFixed(2))
    : Number(RFValue(14, baseHeight).toFixed(2)),
  medium: isTablet
    ? Number(RFValue(16, baseWidth).toFixed(2))
    : Number(RFValue(16, baseHeight).toFixed(2)),
  average: isTablet
    ? Number(RFValue(18, baseWidth).toFixed(2))
    : Number(RFValue(18, baseHeight).toFixed(2)),
  big: isTablet
    ? Number(RFValue(20, baseWidth).toFixed(2))
    : Number(RFValue(20, baseHeight).toFixed(2)),
  title: isTablet
    ? Number(RFValue(24, baseWidth).toFixed(2))
    : Number(RFValue(24, baseHeight).toFixed(2)),
  subTitle: isTablet
    ? Number(RFValue(32, baseWidth).toFixed(2))
    : Number(RFValue(32, baseHeight).toFixed(2)),
  hero: isTablet
    ? Number(RFValue(40, baseWidth).toFixed(2))
    : Number(RFValue(40, baseHeight).toFixed(2)),
};

export const typography: ITypography = {
  fontSize,
};

import { SpacingLabel } from '@audi/audi-ui-react-v2';
import { DeviceType } from '../hooks/useScreenSize';

interface SpacingParams {
  deviceType: DeviceType;
  smallMobileSize?: SpacingLabel | undefined;
  mobileSize?: SpacingLabel | undefined;
  tabletSize?: SpacingLabel | undefined;
  smallDesktopSize?: SpacingLabel | undefined;
  desktopSize?: SpacingLabel | undefined;
}

export const layoutSpacings = (params: SpacingParams) => {
  const { deviceType, smallMobileSize, mobileSize, tabletSize, smallDesktopSize, desktopSize } =
    params;
  switch (deviceType) {
    case DeviceType.SmallMobile:
      return smallMobileSize;
    case DeviceType.Mobile:
      return mobileSize;
    case DeviceType.Tablet:
      return tabletSize;
    case DeviceType.SmallDesktop:
      return smallDesktopSize;
    case DeviceType.Desktop:
      return desktopSize;
    default:
      return undefined;
  }
};

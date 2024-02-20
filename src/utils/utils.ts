import type { BreakpointLabel, SpacingVars, Theme } from '@audi/audi-ui-react-v2';
import type {
  ConfiguredCarFeatureText,
  ConfiguredCarFeatureTyreLabel,
  FinancingDisclaimers,
  Maybe,
  TechnicalDataConsumptionAndEmissionSummary,
} from '@oneaudi/onegraph-client';
import { isSpacingSize } from '../types/utils';

export const isDarkTheme = (theme: Theme): boolean => theme.name === 'Audi Dark Theme';

type SpacingValue = SpacingVars | string | number | undefined;

export const getSpacingCssValue = (
  theme: Theme,
  value: SpacingValue,
  defaultValue?: SpacingValue
) => {
  const usedValue = value ?? defaultValue;

  if (usedValue === undefined) {
    return '';
  }

  if (typeof usedValue === 'number') {
    return `${usedValue}px`;
  }

  if (isSpacingSize(usedValue)) {
    return `var(${theme.responsive.spacing[usedValue]})`;
  }

  return usedValue;
};

const SCREEN_SIZE_BREAKPOINT_LIST = ['xs', 's', 'm', 'l', 'xl', 'xxl'] as const;

export const getScreenSizeCssValue = <T extends string>(
  theme: Theme,
  value: Partial<Record<BreakpointLabel, T>>,
  callback: (value: T) => string,
  defaultValue?: T
) => {
  let usedValue = value;

  if (defaultValue && !('xs' in value)) {
    usedValue = { ...value, xs: defaultValue };
  }

  return Object.entries(usedValue)
    .sort(([breakpointA], [breakpointB]) => {
      return (
        SCREEN_SIZE_BREAKPOINT_LIST.indexOf(breakpointA as BreakpointLabel) -
        SCREEN_SIZE_BREAKPOINT_LIST.indexOf(breakpointB as BreakpointLabel)
      );
    })
    .map(([breakpoint, cssValue]) => {
      return `
        @media (min-width: ${theme.breakpoints[breakpoint as BreakpointLabel]}px) {
          ${callback(cssValue)}
        }
      `;
    })
    .join('\n');
};

export const getEngineFootnote = (
  text: Maybe<TechnicalDataConsumptionAndEmissionSummary> | undefined
) => {
  if (!(text && text.consumption && text.emissionCO2)) return undefined;
  if (`${text.consumption} ${text.emissionCO2}`.length > 1000) return undefined;
  return {
    id: 'fa-confi-engine-footnote',
    value: `${text.consumption} ${text.emissionCO2}`.trim().replace(/<sup>.*?<\/sup>/g, ''),
  };
};
export const isDetailsCtaShown = (
  texts?: ConfiguredCarFeatureText | null,
  image?: string,
  tyreLabel?: Maybe<Maybe<ConfiguredCarFeatureTyreLabel>[]>
) => {
  if (
    texts?.akRemarks ||
    texts?.intro ||
    texts?.benefits ||
    texts?.akText ||
    image ||
    (tyreLabel && tyreLabel.length > 0)
  ) {
    return true;
  }
  return false;
};
export const getDisclaimers = (disclaimersObject: FinancingDisclaimers | undefined) => {
  return `${disclaimersObject?.calculationDisclaimer || ''} ${
    disclaimersObject?.globalDisclaimer || ''
  } ${disclaimersObject?.productDisclaimer || ''} ${disclaimersObject?.rateDetails || ''}
  `;
};

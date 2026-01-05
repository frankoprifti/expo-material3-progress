import type { ViewProps } from 'react-native';

export type ProgressVariant = 'linear' | 'circular';

export type ExpoM3ProgressViewProps = ViewProps & {
  variant?: ProgressVariant;
  indeterminate?: boolean;
  progress?: number;

  // Android wavy (ignored on other platforms)
  wavy?: boolean;
  waveAmplitude?: number;
  wavelength?: number;
  waveSpeed?: number;
  waveAmplitudeRampMin?: number;
  waveAmplitudeRampMax?: number;

  // Colors
  indicatorColor?: string;
  trackColor?: string;

  // Material 3 Expressive Props
  trackCornerRadius?: number;
  trackThickness?: number;
  indicatorSize?: number; // Circular only
  indicatorTrackGap?: number;
  trackStopIndicatorSize?: number; // Linear only
};

export type ExpoM3ProgressModuleEvents = {
  // Add any events if needed in the future
};

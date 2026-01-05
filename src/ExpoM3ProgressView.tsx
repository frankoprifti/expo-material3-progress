import * as React from "react";
import { ActivityIndicator, Platform, processColor } from "react-native";
import { requireNativeViewManager } from "expo-modules-core";
import { ExpoM3ProgressViewProps } from "./ExpoM3Progress.types";

const NativeView: React.ComponentType<any> =
  requireNativeViewManager("ExpoM3Progress");

export default function ExpoM3ProgressView(props: ExpoM3ProgressViewProps) {
  const {
    style,
    variant = "circular",
    indicatorColor,
    trackColor,
    trackCornerRadius,
    trackThickness,
    indicatorSize,
    indicatorTrackGap,
    trackStopIndicatorSize,
    indeterminate = true,
    ...rest
  } = props;

  if (Platform.OS === "web") {
    return null;
  } else if (Platform.OS === "ios") {
    return (
      <ActivityIndicator
        style={style}
        color={indicatorColor}
        animating={indeterminate}
        {...rest}
      />
    );
  }

  // Provide default sizes for Android to ensure rendering even without explicit style
  const defaultStyle: any = variant === 'linear'
    ? { width: '100%', height: 16 }
    : { width: 48, height: 48 };

  return (
    <NativeView
      style={[defaultStyle, style]}
      variant={variant}
      indicatorColor={processColor(indicatorColor)}
      trackColor={processColor(trackColor)}
      trackCornerRadius={trackCornerRadius}
      trackThickness={trackThickness}
      indicatorSize={indicatorSize}
      indicatorTrackGap={indicatorTrackGap}
      trackStopIndicatorSize={trackStopIndicatorSize}
      indeterminate={indeterminate}
      {...rest}
    />
  );
}

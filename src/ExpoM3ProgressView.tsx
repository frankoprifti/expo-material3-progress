import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoM3ProgressViewProps } from './ExpoM3Progress.types';

const NativeView: React.ComponentType<ExpoM3ProgressViewProps> =
  requireNativeView('ExpoM3Progress');

export default function ExpoM3ProgressView(props: ExpoM3ProgressViewProps) {
  return <NativeView {...props} />;
}

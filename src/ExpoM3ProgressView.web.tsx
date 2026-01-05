import * as React from 'react';

import { ExpoM3ProgressViewProps } from './ExpoM3Progress.types';

export default function ExpoM3ProgressView(props: ExpoM3ProgressViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}

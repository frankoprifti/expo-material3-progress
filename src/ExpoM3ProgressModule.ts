import { NativeModule, requireNativeModule } from 'expo';

import { ExpoM3ProgressModuleEvents } from './ExpoM3Progress.types';

declare class ExpoM3ProgressModule extends NativeModule<ExpoM3ProgressModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoM3ProgressModule>('ExpoM3Progress');

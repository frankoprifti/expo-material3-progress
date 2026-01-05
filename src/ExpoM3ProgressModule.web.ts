import { registerWebModule, NativeModule } from 'expo';

import { ExpoM3ProgressModuleEvents } from './ExpoM3Progress.types';

class ExpoM3ProgressModule extends NativeModule<ExpoM3ProgressModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoM3ProgressModule, 'ExpoM3ProgressModule');

import { create } from 'zustand';
import { ICopilotAccessoryStore } from '../types/copilotAccessoryStoreType';

export const useCopilotAccessoryStore = create<ICopilotAccessoryStore>((set, get) => ({
  name: 'User Copilot Accessory Store',
  volumeState: false,
  microphoneState: false,
  cameraState: false,
  resetAccessoryState: (): void => {
    set((state) => ({
      volumeState: false,
      microphoneState: false,
      cameraState: true,
    }));
  },
  setVolumeState: (): void => {
    set((state) => ({
      volumeState: !state.volumeState,
    }));
  },
  setMicrophoneState: (): void => {
    set((state) => ({
      microphoneState: !state.microphoneState,
    }));
  },
  setCameraState: (): void => {
    set((state) => ({
      cameraState: !state.cameraState,
    }));
  },
}));

export default useCopilotAccessoryStore;

import { create } from 'zustand';
import { ICopilotAccessoryStore } from '../types/copilotAccessoryStoreType';

export const useCopilotAccessoryStore = create<ICopilotAccessoryStore>((set, get) => ({
  name: 'User Copilot Accessory Store',
  speechState: false,
  microphoneState: false,
  cameraState: false,
  resetAccessoryState: (): void => {
    set((state) => ({
      speechState: false,
      microphoneState: false,
      cameraState: true,
    }));
  },
  setSpeechState: (): void => {
    set((state) => ({
      speechState: !state.speechState,
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

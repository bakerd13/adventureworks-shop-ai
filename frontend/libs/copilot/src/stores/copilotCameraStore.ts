import { create } from 'zustand';
import { ICopilotCameraStore } from '../types/copilotCameraStoreType';

export const useCopilotCameraStore = create<ICopilotCameraStore>((set, get) => ({
  name: 'User Copilot Accessory Store',
  facing: 'back',
  pin: false,
  picture: null,
  resetCameraState: (): void => {
    set((state) => ({
      type: 'back',
      pin: false,
      picture: null,
    }));
  },
  setFacing: (): void => {
    set((state) => ({
      facing: state.facing === 'back' ? 'front' : 'back',
    }));
  },
  setPin: (): void => {
    set((state) => ({
      pin: !state.pin,
    }));
  },
  setPicture: (picture: string | null | undefined): void => {
    set(() => ({
      picture: picture,
    }));
  },
}));

export default useCopilotCameraStore;

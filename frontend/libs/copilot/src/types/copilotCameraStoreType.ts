import { CameraType } from "expo-camera";

export interface ICopilotCameraStore {
  facing: CameraType;
  pin: boolean;
  picture: string | null;
  resetCameraState: () => void;
  setFacing: () => void;
  setPin: () => void;
  setPicture: (picture: string | null | undefined) => void;
};

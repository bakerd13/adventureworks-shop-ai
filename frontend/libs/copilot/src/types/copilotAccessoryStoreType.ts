export interface ICopilotAccessoryStore {
  volumeState: boolean;
  microphoneState: boolean;
  cameraState: boolean;
  resetAccessoryState: () => void;
  setVolumeState: () => void;
  setMicrophoneState: () => void;
  setCameraState: () => void;
};

export interface ICopilotAccessoryStore {
  speechState: boolean;
  microphoneState: boolean;
  cameraState: boolean;
  resetAccessoryState: () => void;
  setSpeechState: () => void;
  setMicrophoneState: () => void;
  setCameraState: () => void;
};

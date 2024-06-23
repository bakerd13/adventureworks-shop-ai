import { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import AudioVisualizer from './audioVisualizer';
import { styles } from './audioComposer.styles';
import usePreferenceStore from '../../../stores/preferenceStore';
import { MessageDTO, MessageType } from '../../../types/messages';
import { MIN_COMPOSER_HEIGHT } from '../../../constants';
import useCopilotStore from '../../../stores/copilotStore';
import MessageHandler from '../../../handlers/messageHandler';

const AudioComposer = ({ microphoneState = false, composerHeight = MIN_COMPOSER_HEIGHT } 
  : { microphoneState: boolean, composerHeight?: number; }) => {
  
    let chunks: BlobPart[] = [];  
  const [recording, setRecording] = useState<MediaRecorder | null | undefined>();
  const [windowWidth, setWindowWidth] = useState<number>(500);
  const { user } = usePreferenceStore((state) => state);
  const { conversation } = useCopilotStore((state) => state);
  
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (microphoneState) {
      startRecording();
    } else {
      stopRecording();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState]);
  
  useEffect(() => {
    const breakpoints = [
      { maxWidth: 320, windowWidth: 50 },
      { maxWidth: 480, windowWidth: 50 },
      { maxWidth: 768, windowWidth: 100 },
      { maxWidth: 1024, windowWidth: 450 },
      { maxWidth: 1280, windowWidth: 500 },
    ];
  
    const defaultWidth = 500; // Default width if no breakpoints are matched
    let newWidth = defaultWidth; // Start with the default width
  
    // Find the first breakpoint that matches the current width
    const matchedBreakpoint = breakpoints.find(breakpoint => width < breakpoint.maxWidth);
    if (matchedBreakpoint) {
      newWidth = matchedBreakpoint.windowWidth;
    }
    
    setWindowWidth(newWidth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };  

      mediaRecorder.onstop = (e) => {
        const blob = new Blob(chunks, { type: 'audio/mpeg' });
        chunks = [];

        const tracks = stream.getTracks();
        // When all tracks have been stopped the stream will
        // no longer be active and release any permissioned input
        tracks.forEach((track) => track.stop());

        const formData = new FormData();
        formData.append('file', blob, 'audio.mpeg');

        sendFormData(formData);
      };

      setRecording(mediaRecorder);
      mediaRecorder.start();
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    recording?.stop();
    setRecording(null);
  }

  // Fetch the CSRF token
const fetchCsrfToken = async () => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/antiforgery/token`, {
      method: 'GET',
      headers: {
        'X-Api-Version': '1.0',
      }
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error:', error);
  }
};

const sendFormData = async (formData: FormData) => {
  const csrfToken = await fetchCsrfToken();

  const url = `${process.env.EXPO_PUBLIC_ADVENTUREWORKS_AI_URL}/api/speech/speech-to-text`;
  const options = {
    method: 'POST',
    headers: {
      'X-Api-Version': '1.0',
      'X-XSRF-TOKEN': csrfToken,
    },
    body: formData,
  };

  // Send the FormData to the endpoint
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const message: MessageDTO = {
      id: uuidv4(),
      messageType: MessageType.Message,
      content: data,
      user: user,
      createdAt: new Date(),
      conversationId: conversation.id,
      like: null,
    };
    
    MessageHandler(message);
  } catch (error) {
    console.error('Error:', error);
  }
};

  return microphoneState ? (
      <View style={[styles.audioInput, { height: composerHeight }]}>
        <AudioVisualizer mediaRecorder={recording} height={composerHeight / 2.5} width={windowWidth} />
      </View>
  ) : null;
}

  export default AudioComposer;
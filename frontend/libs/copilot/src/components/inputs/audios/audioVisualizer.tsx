import {
    type ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
  import { processFrequencyData } from "./soundUtils";
import { View } from "react-native";
import Canvas from "react-native-canvas";
import { SoundProps } from "./soundTypes";
  
  
  const AudioVisualizer = ({
    mediaRecorder,
    width = 100,
    height = 100,
    barWidth = 2,
    gap = 1,
    backgroundColor = "transparent",
    barColor = "rgb(160, 198, 255)",
    fftSize = 1024,
    maxDecibels = -10,
    minDecibels = -90,
    smoothingTimeConstant = 0.4,
  }: SoundProps) => {
    const [context] = useState(() => new AudioContext());
    const [analyser, setAnalyser] = useState<AnalyserNode>();
    const canvasRef = useRef<Canvas>(null);
  
    useEffect(() => {
      if (!mediaRecorder?.stream) return;
  
      const analyserNode = context.createAnalyser();
      setAnalyser(analyserNode);
      analyserNode.fftSize = fftSize;
      analyserNode.minDecibels = minDecibels;
      analyserNode.maxDecibels = maxDecibels;
      analyserNode.smoothingTimeConstant = smoothingTimeConstant;
      const source = context.createMediaStreamSource(mediaRecorder.stream);
      source.connect(analyserNode);
    }, [mediaRecorder?.stream]);
  
    useEffect(() => {
      if (analyser && mediaRecorder?.state === "recording") {
        report();
      }
    }, [analyser, mediaRecorder?.state]);
  
    const report = useCallback(() => {
      if (!analyser) return;
  
      const data = new Uint8Array(analyser?.frequencyBinCount);
      const processData = {
        data,
        canvasRef,
        barWidth,
        gap,
        backgroundColor,
        barColor,
      }

      if (mediaRecorder?.state === "recording") {
        analyser?.getByteFrequencyData(data);
        processFrequencyData(processData);
        requestAnimationFrame(report);
      } else if (mediaRecorder?.state === "paused") {
        processFrequencyData(processData);
      } else if (
        mediaRecorder?.state === "inactive" &&
        context.state !== "closed"
      ) {
        context.close();
      }
    }, [analyser, context.state]);
  
    return (
        <View>
          <Canvas ref={canvasRef} />
        </View>
      );
  };
  
  export default AudioVisualizer;
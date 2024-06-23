import {
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
import { SoundProps } from "./soundTypes";
import { processFrequencyData } from "./soundUtils";
  
  const AudioVisualizer = ({
    mediaRecorder,
    width = 500,
    height = 50,
    barWidth = 2,
    gap = 1,
    backgroundColor = 'transparent',
    barColor = 'rgb(160, 198, 255)',
    fftSize = 1024,
    maxDecibels = -10,
    minDecibels = -90,
    smoothingTimeConstant = 0.4,
  }: SoundProps) => {
    const [context] = useState(() => new AudioContext());
    const [analyser, setAnalyser] = useState<AnalyserNode>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (!mediaRecorder) {
        return;
      }

      const analyserNode = context.createAnalyser();
      setAnalyser(analyserNode);
      analyserNode.fftSize = fftSize;
      analyserNode.minDecibels = minDecibels;
      analyserNode.maxDecibels = maxDecibels;
      analyserNode.smoothingTimeConstant = smoothingTimeConstant;
      const source = context.createMediaStreamSource(mediaRecorder.stream);
      source.connect(analyserNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaRecorder]);
  
    useEffect(() => {
      if (analyser && mediaRecorder?.state === "recording") {
        report();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analyser, mediaRecorder?.state, width]);
  
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

      analyser?.getByteFrequencyData(data);
      processFrequencyData(processData);
      requestAnimationFrame(report);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analyser, context.state]);
  
    return (<canvas ref={canvasRef} width={width} height={height}/>);
  };
  
  export default AudioVisualizer;
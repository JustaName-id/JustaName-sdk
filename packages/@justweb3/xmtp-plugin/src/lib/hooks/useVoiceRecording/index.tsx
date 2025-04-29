import type { Attachment } from "@xmtp/content-type-remote-attachment";
import { useRef, useState } from "react";

interface useVoiceRecordingProps {
  setAttachment: (attachment: Attachment | undefined) => void;
  setAttachmentPreview: (url: string | undefined) => void;
  onError?: (error: string) => void;
}

export const useRecordVoice = ({ setAttachment, setAttachmentPreview, onError }: useVoiceRecordingProps) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const chunks = useRef<Blob[]>([]);

  const stopMediaStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  const startRecording = async () => {
    if (!mediaStream) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMediaStream(stream);
        const newMediaRecorder = new MediaRecorder(stream);

        newMediaRecorder.onstart = () => {
          chunks.current = [];
        };

        newMediaRecorder.ondataavailable = (ev) => {
          chunks.current.push(ev.data);
        };

        newMediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
          const blobUrl = URL.createObjectURL(audioBlob);
          setAttachmentPreview(blobUrl);

          const arrayBuffer = await audioBlob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          const newAttachment = {
            filename: "VoiceRecording.wav",
            mimeType: "audio/wav",
            data: uint8Array,
          };
          setAttachment(newAttachment);
        };

        setMediaRecorder(newMediaRecorder);
        setTimeout(() => {
          try {
            newMediaRecorder.start();
            setRecording(true);
          } catch (error) {
            onError?.("Error starting the MediaRecorder.");
          }
        }, 10);
      } catch (error) {
        onError?.("Error accessing media devices.");
      }
    } else if (mediaRecorder) {
      try {
        mediaRecorder.start();
        setRecording(true);
      } catch (error) {
        onError?.("Error starting the MediaRecorder.");
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      stopMediaStream();
    }
  };

  // useEffect(() => {
  //   return () => {
  //     stopMediaStream();
  //   };
  // }, [mediaStream, stopMediaStream]);

  return {
    recording, startRecording, stopRecording
  };
};

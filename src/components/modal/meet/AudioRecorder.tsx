import React, { useRef, useImperativeHandle, forwardRef } from 'react';

interface AudioRecorderProps {
    onRecordingStopped: (blob: Blob) => void; // Blob 전달
}

const AudioRecorder = forwardRef(
    ({ onRecordingStopped }: AudioRecorderProps, ref) => {
        const mediaRecorderRef = useRef<MediaRecorder | null>(null);
        const chunksRef = useRef<Blob[]>([]);

        const mergeAudioStreams = async (
            systemStream: MediaStream,
            micStream: MediaStream,
        ): Promise<MediaStream> => {
            const context = new AudioContext();
            const destination = context.createMediaStreamDestination();

            const systemAudioTracks = systemStream.getAudioTracks();
            if (systemAudioTracks.length > 0) {
                const systemSource =
                    context.createMediaStreamSource(systemStream);
                systemSource.connect(destination);
            }

            const micAudioTracks = micStream.getAudioTracks();
            if (micAudioTracks.length > 0) {
                const micSource = context.createMediaStreamSource(micStream);
                micSource.connect(destination);
            }

            if (systemAudioTracks.length === 0 && micAudioTracks.length === 0) {
                console.warn('No audio tracks found in provided streams.');
            }

            return destination.stream;
        };

        const startRecording = async () => {
            try {
                console.log('Attempting to start recording...');
                const displayStream =
                    await navigator.mediaDevices.getDisplayMedia({
                        video: true,
                        audio: true,
                    });

                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

                const combinedStream = await mergeAudioStreams(
                    displayStream,
                    audioStream,
                );

                const mediaRecorder = new MediaRecorder(combinedStream, {
                    mimeType: 'audio/webm;codecs=opus',
                });

                mediaRecorder.ondataavailable = (event: BlobEvent) => {
                    if (event.data.size > 0) {
                        chunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, {
                        type: 'audio/webm',
                    });
                    chunksRef.current = [];
                    console.log('Recording has been stopped and processed.');

                    // 다운로드 처리
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `recording_${new Date().toISOString()}.webm`;
                    document.body.appendChild(a);
                    a.click();
                    URL.revokeObjectURL(url);
                    document.body.removeChild(a);

                    onRecordingStopped(blob); // 녹음 종료 시 Blob 전달
                };

                mediaRecorder.start();
                mediaRecorderRef.current = mediaRecorder;
                console.log('Recording started successfully.');
            } catch (error) {
                console.error('Error starting recording:', error);
                alert('녹음을 시작하지 못했습니다. 권한 설정을 확인해주세요.');
            }
        };

        const stopRecording = () => {
            const mediaRecorder = mediaRecorderRef.current;
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                const tracks = mediaRecorder.stream.getTracks();
                tracks.forEach((track: MediaStreamTrack) => track.stop());
                mediaRecorderRef.current = null;
                console.log('Stopped recording and released resources.');
            } else {
                console.log('No active recording to stop.');
            }
        };

        useImperativeHandle(ref, () => ({
            startRecording,
            stopRecording,
            getRecordingBlob: () => {
                if (chunksRef.current.length > 0) {
                    return new Blob(chunksRef.current, { type: 'audio/webm' });
                }
                return null;
            },
        }));

        return null;
    },
);

export default AudioRecorder;

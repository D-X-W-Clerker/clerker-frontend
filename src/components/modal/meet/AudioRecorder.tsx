import React, { useEffect, useRef } from 'react';

interface AudioRecorderProps {
    isRecording: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ isRecording }) => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecording]);

    const mergeAudioStreams = (
        systemStream: MediaStream | null,
        micStream: MediaStream | null,
    ): MediaStream => {
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();

        if (systemStream) {
            const systemSource = context.createMediaStreamSource(systemStream);
            systemSource.connect(destination);
        }

        if (micStream) {
            const micSource = context.createMediaStreamSource(micStream);
            micSource.connect(destination);
        }

        return destination.stream;
    };

    const startRecording = async () => {
        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: true, // video: true를 추가하여 오류 해결
                audio: true,
            });

            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const combinedStream = mergeAudioStreams(displayStream, audioStream);

            const mediaRecorder = new MediaRecorder(combinedStream, {
                mimeType: 'audio/webm;codecs=opus',
            });

            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                // 녹음된 오디오를 처리합니다.
                chunksRef.current = [];
                console.log('Recording stopped'); // 녹음 종료 시 로그 출력
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;
            console.log('Recording started'); // 녹음 시작 시 로그 출력
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('녹음을 시작하지 못했습니다. 권한을 확인하고 다시 시도해주세요.');
        }
    };

    const stopRecording = () => {
        const mediaRecorder = mediaRecorderRef.current;
        if (mediaRecorder) {
            mediaRecorder.stop();
            const tracks = mediaRecorder.stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            mediaRecorderRef.current = null;
            // 'Recording stopped' 로그는 이미 onstop 이벤트에서 처리됨
        }
    };

    return null; // UI 요소를 렌더링하지 않음
};

export default AudioRecorder;

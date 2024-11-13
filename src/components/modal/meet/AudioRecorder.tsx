// AudioRecorder.tsx

import React, { useRef, useImperativeHandle, forwardRef } from 'react';

interface AudioRecorderProps {
    onRecordingStopped: () => void;
}

const AudioRecorder = forwardRef(({ onRecordingStopped }: AudioRecorderProps, ref) => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const mergeAudioStreams = (
        systemStream: MediaStream,
        micStream: MediaStream,
    ): MediaStream => {
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();

        const systemSource = context.createMediaStreamSource(systemStream);
        const micSource = context.createMediaStreamSource(micStream);

        systemSource.connect(destination);
        micSource.connect(destination);

        return destination.stream;
    };

    const startRecording = async () => {
        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
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
                console.log('Recording stopped');

                // 녹음 종료 시 호출
                onRecordingStopped();
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
            // 녹음 시작 실패 시 alert 제거
            // alert('녹음을 시작하지 못했습니다. 권한을 확인하고 다시 시도해주세요.');
        }
    };

    const stopRecording = () => {
        const mediaRecorder = mediaRecorderRef.current;
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            const tracks = mediaRecorder.stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            mediaRecorderRef.current = null;
        }
    };

    useImperativeHandle(ref, () => ({
        startRecording,
        stopRecording,
    }));

    return null;
});

export default AudioRecorder;

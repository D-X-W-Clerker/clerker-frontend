// AudioRecorder.tsx

import React, { useRef, useImperativeHandle, forwardRef } from 'react';

interface AudioRecorderProps {
    onRecordingStopped: (blob: Blob | null) => void; // Blob 또는 null 전달
}

export interface AudioRecorderHandle {
    startRecording: () => void;
    stopRecording: () => void;
    getRecordingBlob: () => Blob | null;
}

const AudioRecorder = forwardRef<AudioRecorderHandle, AudioRecorderProps>(
    ({ onRecordingStopped }, ref) => {
        const mediaRecorderRef = useRef<MediaRecorder | null>(null);
        const chunksRef = useRef<Blob[]>([]);

        const startRecording = async () => {
            try {
                console.log('Attempting to start recording...');

                // 지원되는 MIME 타입 확인
                const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm'];

                let selectedMimeType = '';
                for (const mimeType of mimeTypes) {
                    if (MediaRecorder.isTypeSupported(mimeType)) {
                        selectedMimeType = mimeType;
                        break;
                    }
                }

                if (!selectedMimeType) {
                    throw new Error('지원되는 MIME 타입이 없습니다.');
                }

                console.log(`Selected MIME type: ${selectedMimeType}`);

                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

                // 오디오 트랙 확인
                const audioTracks = audioStream.getAudioTracks();
                console.log('Audio tracks:', audioTracks);
                if (audioTracks.length === 0) {
                    throw new Error('오디오 트랙을 찾을 수 없습니다.');
                }

                const mediaRecorder = new MediaRecorder(audioStream, {
                    mimeType: selectedMimeType,
                });

                mediaRecorder.ondataavailable = (event: BlobEvent) => {
                    if (event.data.size > 0) {
                        console.log('Data available:', event.data);
                        chunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, {
                        type: selectedMimeType,
                    });
                    console.log('Recorded Blob:', blob);
                    chunksRef.current = [];
                    console.log('Recording has been stopped and processed.');

                    onRecordingStopped(blob); // 녹음 종료 시 Blob 전달
                };

                mediaRecorder.start();
                mediaRecorderRef.current = mediaRecorder;
                console.log('Recording started successfully.');
            } catch (error) {
                console.error('Error starting recording:', error);
                alert('녹음을 시작하지 못했습니다. 권한 설정을 확인해주세요.');
                onRecordingStopped(null); // 녹음 실패 시 null 전달
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

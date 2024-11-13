import React, { useState, useRef } from 'react';

const AudioRecorder: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false); // Manage recording state
    const [audioUrl, setAudioUrl] = useState(''); // Store the URL of the recorded audio
    const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Ref for MediaRecorder instance
    const chunksRef = useRef<Blob[]>([]); // Ref to store recorded audio data chunks

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
            // Get system audio stream
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                audio: true,
            });

            // Get microphone audio stream
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            // Merge system and microphone audio streams
            const combinedStream = mergeAudioStreams(
                displayStream,
                audioStream,
            );

            // Create and configure MediaRecorder instance
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
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                chunksRef.current = [];
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
            alert(
                '녹음을 시작하지 못했습니다. 권한을 확인하고 다시 시도해주세요.',
            );
        }
    };

    const stopRecording = () => {
        const mediaRecorder = mediaRecorderRef.current;
        if (mediaRecorder) {
            mediaRecorder.stop();
            const tracks = mediaRecorder.stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            setIsRecording(false);
            mediaRecorderRef.current = null;
        }
    };

    return (
        <div>
            <h1>음성 녹음기</h1>
            {isRecording ? (
                <button onClick={stopRecording}>녹음 중지</button>
            ) : (
                <button onClick={startRecording}>녹음 시작</button>
            )}
            {audioUrl && (
                <div>
                    <h2>녹음된 오디오</h2>
                    <audio src={audioUrl} controls />
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;

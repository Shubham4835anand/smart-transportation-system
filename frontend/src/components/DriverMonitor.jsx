import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const DriverMonitor = () => {
  const videoRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log('🔄 Loading Models...');

        const modelPath = import.meta.env.BASE_URL + 'models'; // Vite-friendly path

        await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
        await faceapi.nets.faceLandmark68Net.loadFromUri(
          import.meta.env.BASE_URL + 'models'
        );

        console.log('✅ Models Loaded Successfully!');
      } catch (error) {
        console.error('❌ Error Loading Models:', error);
      }
    };

    const startVideo = async () => {
      try {
        console.log('🎥 Starting webcam...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
        console.log('✅ Webcam started!');
      } catch (err) {
        console.error('❌ Webcam error:', err);
      }
    };

    const detectDrowsiness = async () => {
      console.log('🔍 Checking for drowsiness...');

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      if (!detection) {
        console.log('❌ No face detected!');
        return;
      }

      console.log('✅ Face detected!');

      // Get eye landmarks
      const leftEye = detection.landmarks.getLeftEye();
      const rightEye = detection.landmarks.getRightEye();

      console.log('👁 Left Eye:', leftEye);
      console.log('👁 Right Eye:', rightEye);

      if (isEyesClosed(leftEye, rightEye)) {
        console.log('😴 Drowsiness detected!');
        statusRef.current.innerText = 'Drowsiness Detected!';
      } else {
        console.log('✅ Eyes Open');
        statusRef.current.innerText = 'Alert';
      }
    };

    function isEyesClosed(leftEye, rightEye) {
      // Check the vertical eye distance (difference in y-coordinates)
      const eyeClosedThreshold = 5;
      const leftEyeHeight = leftEye[1].y - leftEye[5].y;
      const rightEyeHeight = rightEye[1].y - rightEye[5].y;
      return (
        leftEyeHeight < eyeClosedThreshold &&
        rightEyeHeight < eyeClosedThreshold
      );
    }

    const alertDriver = () => {
      const audio = new Audio('/alert.mp3');
      audio.play();
    };

    loadModels();
    startVideo();

    const startDetection = () => {
      setInterval(detectDrowsiness, 1000);
    };

    videoRef.current?.addEventListener('loadeddata', startDetection);
  }, []);

  return (
    <div className='text-center'>
      <h2 className='text-2xl font-bold'>Driver Monitoring AI</h2>
      <video ref={videoRef} width='640' height='480' autoPlay />
      <p ref={statusRef} className='text-lg font-semibold text-red-600'>
        Initializing...
      </p>
    </div>
  );
};

export default DriverMonitor;

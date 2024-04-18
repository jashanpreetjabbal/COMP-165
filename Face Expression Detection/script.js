const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startRecordingBtn = document.getElementById('startRecording');
const endRecordingBtn = document.getElementById('endRecording');

let isRecording = false;
let recordedEmotions = [];

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models/'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models/'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models/'),
  faceapi.nets.faceExpressionNet.loadFromUri('models/')
]).then(startVideo)
.catch(err => console.error(err)); 

async function startVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });
  } catch (err) {
    console.error(err);
  }
}

function startRecording() {
  isRecording = true;
  canvas.style.display = 'block';
}

function endRecording() {
  isRecording = false;
  console.log(recordedEmotions);
  recordedEmotions = []; 
  canvas.style.display = 'none';
}

video.addEventListener('play', () => {
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    if (isRecording) {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      
      resizedDetections.forEach(detection => {
        const expressions = detection.expressions;
        const dominantEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
        recordedEmotions.push({ time: new Date(), emotion: dominantEmotion });
      });
    }
  }, 100);
});

startRecordingBtn.addEventListener('click', startRecording);
endRecordingBtn.addEventListener('click', endRecording);


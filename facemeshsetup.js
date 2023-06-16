var expose;
function onResults(results) {
  expose = results;
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    // for (const landmarks of results.multiHandLandmarks) {
    //   drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
    //                  {color: '#00FF00', lineWidth: 5});
    //   drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    // }
    canvasCtx.fillStyle = "cyan";
    canvasCtx.font = "30px Arial";
    // for (const point of results.multiHandLandmarks[0]) {
    for (const pointInd in results.multiHandLandmarks[0]) {
      const pt = results.multiHandLandmarks[0][pointInd];

      canvasCtx.fillStyle = "cyan";
      canvasCtx.beginPath();
      canvasCtx.ellipse(pt.x*canvasElement.width, pt.y*canvasElement.height, 5, 5, 0,0,6.28);
      canvasCtx.fill();

      canvasCtx.fillStyle = "white";
      canvasCtx.fillText(pointInd, pt.x*canvasElement.width+5, pt.y*canvasElement.height-10)
    }
  }
  canvasCtx.restore();
}

var videoElement;

var canvasElement;
var canvasCtx;
var hands;

function main(){
  videoElement = document.getElementsByClassName('input_video')[0];
  canvasElement = document.getElementsByClassName('output_canvas')[0];
  canvasCtx = canvasElement.getContext('2d');

  hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});
  hands.setOptions({
    maxNumHands: 2,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5
  });
  hands.onResults(onResults);


  // const camera = new Camera(videoElement, {
  //   onFrame: async () => {
  //     await hands.send({image: videoElement});
  //   },
  //   width: 1280,
  //   height: 720,
  //   facingMode: {
  //     exact: 'environment'
  //   }
  // });
  // camera.start();

  setupCamera();
  // startHandLoop();
}

// async function startHandLoop(){
//   hands.send({image: videoElement});
//   // hands.send(videoElement);
//   // requestAnimationFrame(startHandLoop);
// }


async function setupCamera() {
  video = videoElement;
  const stream = await navigator.mediaDevices.getUserMedia({
    onFrame: async () => {
      await hands.send({image: videoElement});
    },
    'audio': false,
    'video': {
      aspectRatio: 1.333,
      width: {ideal: 1280},
      facingMode: {
        exact: 'environment'
      }
    },
  });

  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);

        // deviceList = await navigator.mediaDevices.enumerateDevices();
        // backCamID = deviceList.find(x => x.label == "Back Camera").deviceId;
        // setupBackCam(backCamID);

    };
  });
}




async function setupBackCam(id){
  video = videoElement;
  const stream = await navigator.mediaDevices.getUserMedia({
    // onFrame: async () => {
    //   await hands.send({image: videoElement});
    // },
    'video': {
      deviceId: backCamID
      // aspectRatio: 1.333,
      // width: {ideal: 1280},
      // facingMode: {
      //   exact: 'environment'
      // }
    },
  });

  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

  // const camera = new Camera(videoElement, {
  //   onFrame: async () => {
  //     await hands.send({image: videoElement});
  //   },
  //   width: 1280,
  //   height: 720,
  //   facingMode: 'environment'
  // });
  // camera.start();



// var videoElement = document.getElementsByClassName('input_video')[0];
// var canvasElement = document.getElementsByClassName('output_canvas')[0];
// var canvasCtx = canvasElement.getContext('2d');

// function onResults(results) {
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(
//       results.image, 0, 0, canvasElement.width, canvasElement.height);
//   if (results.multiHandLandmarks) {
//     for (const landmarks of results.multiHandLandmarks) {
//       drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
//                      {color: '#00FF00', lineWidth: 5});
//       drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
//     }
//   }
//   canvasCtx.restore();
// }




// function main(){
//   var hands = new Hands({locateFile: (file) => {
//     return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
//   }});
//   hands.setOptions({
//     maxNumHands: 2,
//     minDetectionConfidence: 0.5,
//     minTrackingConfidence: 0.5
//   });
//   setupCamera();
// }

// async function runOnFrame() {

// }






// // const camera = new Camera(videoElement, {
// //   onFrame: async () => {
// //     await hands.send({image: videoElement});
// //   },
// //   width: 1280,
// //   height: 720
// // });
// // camera.start();
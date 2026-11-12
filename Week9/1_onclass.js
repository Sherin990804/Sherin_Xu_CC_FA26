let handPose;
let video;
let hands = [];
let connections;

async function setup() {
  createCanvas(640, 480);
  
  // Load the handPose model asynchronously
  handPose = await ml5.handPose();
  
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  connections = handPose.getConnections();
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // 第一层循环识别所有出现在摄像机里的手
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
      // 第二层循环识别每只手的关键节点，用绿色小圆画出来
      // i决定现在处理哪只手，j决定现在处理这只手的哪个关节点，hands[i].keypoints[j] 就是最终访问的对象。

        for (let j = 0; j < connections.length; j++) {
        let connection = connections[j];
        // 获取需要连接的两个关节点
        let pointA = hand.keypoints[connection[0]];
        let pointB = hand.keypoints[connection[1]];

        // 绘制白色连接线
        stroke(255);
        strokeWeight(3);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
  // 前面handPose.detectStart(video, gotHands);是把detect到的所有手的关键点数据传给了gotHands()函数
  // 这里再把gotHands()函数把这些数据存储在hands数组里。
}

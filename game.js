// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDdpTizZEN6MUnsealEnWEstCu168OYw0",
  authDomain: "no-to-losers.firebaseapp.com",
  databaseURL: "https://no-to-losers-default-rtdb.firebaseio.com",
  projectId: "no-to-losers",
  storageBucket: "no-to-losers.appspot.com",
  messagingSenderId: "614042942914",
  appId: "1:614042942914:web:362ea7549b3a2b2e8dea5b",
  measurementId: "G-XX6N16BQLD"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: 100 + Math.random() * 200,
  y: 0,
  width: 50,
  height: 50,
  color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  vx: 0,
  vy: 0,
  jumping: false
};

let gravity = 1;
let friction = 0.8;
let groundHeight = canvas.height - 100;

function drawPlayer(p) {
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x, p.y, p.width, p.height);
}

function drawGround() {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, groundHeight, canvas.width, 100);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGround();

  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;

  // تصادم مع الأرض
  if (player.y + player.height >= groundHeight) {
    player.y = groundHeight - player.height;
    player.vy = 0;
    player.jumping = false;
  }

  drawPlayer(player);

  requestAnimationFrame(update);
}

function move(direction) {
  if (direction === "left") player.vx = -5;
  if (direction === "right") player.vx = 5;
}

function jump() {
  if (!player.jumping) {
    player.vy = -20;
    player.jumping = true;
  }
}

window.addEventListener("touchend", () => {
  player.vx = 0;
});

update();

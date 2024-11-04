let startTime, elapsedTime = 0, timerInterval;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function timeToString(time) {
  let diffInHrs = Math.floor(time / 3600000);
  let diffInMin = Math.floor((time % 3600000) / 60000);
  let diffInSec = Math.floor((time % 60000) / 1000);
  let diffInMs = Math.floor((time % 1000) / 10);

  let formattedHrs = diffInHrs.toString().padStart(2, "0");
  let formattedMin = diffInMin.toString().padStart(2, "0");
  let formattedSec = diffInSec.toString().padStart(2, "0");
  let formattedMs = diffInMs.toString().padStart(2, "0");

  return `${formattedHrs}:${formattedMin}:${formattedSec}.${formattedMs}`;
}

function startStop() {
  if (!running) {
    startTimer();
  } else {
    stopTimer();
  }
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10);

  startStopBtn.textContent = "Pause";
  running = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  startStopBtn.textContent = "Start";
  running = false;
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  laps.innerHTML = ""; // Clear laps
}

function recordLap() {
  if (running) {
    const lapTime = timeToString(elapsedTime);
    const lapElement = document.createElement("li");
    lapElement.textContent = lapTime;
    laps.appendChild(lapElement);
  }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

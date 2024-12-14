let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopButton = document.getElementById("start-stop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const lapsContainer = document.getElementById("laps");

function formatTime(time) {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);
  const hours = Math.floor(time / 3600000);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString.padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
}

function startStop() {
  if (isRunning) {
    // Stop the timer
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startStopButton.textContent = "Start";
  } else {
    // Start the timer
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const time = elapsedTime + (Date.now() - startTime);
      display.textContent = formatTime(time);
    }, 10);
    startStopButton.textContent = "Stop";
  }
  isRunning = !isRunning;
}

function lap() {
  if (isRunning) {
    const time = elapsedTime + (Date.now() - startTime);
    const lapTime = formatTime(time);
    const lapElement = document.createElement("div");
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:00";
  startStopButton.textContent = "Start";
  lapsContainer.innerHTML = "";
}

startStopButton.addEventListener("click", startStop);
lapButton.addEventListener("click", lap);
resetButton.addEventListener("click", reset);
import React, { useState, useEffect, useRef } from 'react';

const DigitalClock = ({t}) => {
    // state to store time
    console.log('t',t)
    let hours = 1
    let minutes = 12
    let seconds = 14

    const initialTime = hours * 360000 + minutes * 6000 + seconds * 100;

    const [time, setTime] = useState(initialTime);
  
    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      let intervalId;
      if (isRunning) {
        // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
        intervalId = setInterval(() => setTime(time + 1), 10);
      }
      return () => clearInterval(intervalId);
    }, [isRunning, time]);
  
    // Hours calculation
     hours = Math.floor(time / 360000);
  
    // Minutes calculation
     minutes = Math.floor((time % 360000) / 6000);
  
    // Seconds calculation
     seconds = Math.floor((time % 6000) / 100);
  
    // Milliseconds calculation
   let  milliseconds = time % 100;
  
    // Method to start and stop timer
    const startAndStop = () => {
      setIsRunning(!isRunning);
    };
  
    // Method to reset timer back to 0
    const reset = () => {
      setTime(0);
    };
    return (
      <div className="stopwatch-container">
        <p className="stopwatch-time">
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
        <div className="stopwatch-buttons">
          <button className="stopwatch-button" onClick={startAndStop}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="stopwatch-button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    );
  };

export default DigitalClock;

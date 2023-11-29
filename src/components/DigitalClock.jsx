import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/DigitalClock.css';
import CONSTANTS from '../assets/contants.json';

const DigitalClock = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [countries, setCountries] = useState([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  let milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    try {
      const response = await axios.get(
        `${CONSTANTS.countryUrl}/${selectedValue}`
      );
      const hour = response.data.datetime.substring(11, 13);
      const minute = response.data.datetime.substring(14, 16);
      const second = response.data.datetime.substring(17, 19);
      setTime(hour * 360000 + minute * 6000 + second * 100);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryRes = await axios.get(CONSTANTS.countryUrl);
        setCountries(countryRes.data);

        const selectedValue = countryRes.data[0];
        setSelectedOption(selectedValue);
        const initialCountery = await axios.get(
          `${CONSTANTS.countryUrl}/${selectedValue}`
        );
        const hour = initialCountery.data.datetime.substring(11, 13);
        const minute = initialCountery.data.datetime.substring(14, 16);
        const second = initialCountery.data.datetime.substring(17, 19);
        setTime(hour * 360000 + minute * 6000 + second * 100);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="sub_header_div">
      <select value={selectedOption} onChange={handleSelectChange}>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <span>
        <div className="stopwatch-container">
          <div className='stopwatch_timer'>
            {hours} : {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')} : {milliseconds.toString().padStart(2, '0')}
          </div>
          <div>
            <button className="stopwatch-button" onClick={startAndStop}>
            Pause/Start
            </button>
          </div>
        </div>
      </span>
    </div>
  );
};

export default DigitalClock;

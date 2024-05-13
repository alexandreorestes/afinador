import React, { useState, useRef } from 'react';
import './App.css';

const Tuner = () => {
  const [tuning] = useState({
    E: 82.41,
    A: 110.00,
    D: 146.83,
    G: 196.00,
    B: 246.94,
    e: 329.63,
  });
  const [currentNote, setCurrentNote] = useState(null);
  const oscillatorRef = useRef(null);
  const gain = 2.5; // Ganho definido manualmente no código

  const tuneString = (string, frequency) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(gain, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillatorRef.current = oscillator;
  };

  const toggleSound = (event) => {
    const string = event.target.dataset.string;
    const frequency = tuning[string];

    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
      event.target.style.backgroundColor = 'brown';
    } else {
      tuneString(string, frequency);
      setCurrentNote(string);
      oscillatorRef.current.start();
      event.target.style.backgroundColor = 'green';
    }
  };

  return (
    <div>
      <h1>Diapasão Para Violão</h1>
      <br />
      <div>
        <button onClick={toggleSound} data-string="E">
          6ªE
        </button>
        <button onClick={toggleSound} data-string="A">
          5ªA
        </button>
        <button onClick={toggleSound} data-string="D">
          4ªD
        </button>
        <button onClick={toggleSound} data-string="G">
          3ªG
        </button>
        <button onClick={toggleSound} data-string="B">
          2ªB
        </button>
        <button onClick={toggleSound} data-string="e">
          1ªe
        </button>
      </div>
      {currentNote && <p>Nota atual: {currentNote}</p>}
    </div>
  );
};

export default Tuner;

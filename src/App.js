import React, { useState } from 'react';
import './App.css';

const Tuner = () => {
  const [tuning] = useState({
    E:  82.41,
    A: 110.00,
    D: 146.83,
    G: 196.00,
    B: 246.94,
    e: 329.63
  });
  const [currentNote, setCurrentNote] = useState(null);

  const tuneString = (string, frequency) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 10000);
  };

  const checkTuning = (event) => {
    const string = event.target.dataset.string;
    const frequency = tuning[string];
    tuneString(string, frequency);
    setCurrentNote(string);
    // Mudar a cor do botão quando clicado
    event.target.style.backgroundColor = 'green';
    // Resetar a cor do botão após 500ms
    setTimeout(() => {
      event.target.style.backgroundColor = 'brown';
    }, 10000);
  };

  return (
    <div>
      <h1>Diapasão Para Violão</h1><br />
      <div>
        <button onClick={checkTuning} data-string="E">6ª MI</button>
        <button onClick={checkTuning} data-string="A">5ª LÁ</button>
        <button onClick={checkTuning} data-string="D">4ª RÉ</button>
        <button onClick={checkTuning} data-string="G">3ª SOL</button>
        <button onClick={checkTuning} data-string="B">2ª SI</button>
        <button onClick={checkTuning} data-string="e">1ª mi</button>
      </div>
      {currentNote && <p>Nota atual: {currentNote}</p>}
    </div>
  );
};

export default Tuner;

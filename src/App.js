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

  const [cavaquinhoTuning] = useState({
    D4: 587.32,  // Primeira corda
    B3: 493.88,  // Segunda corda
    G4: 392.00,  // Terceira corda
    D4_2: 293.66 // Quarta corda (segundo D4)
  });

  const [currentNote, setCurrentNote] = useState(null);
  const oscillatorRef = useRef(null);
  const [gain, setGain] = useState(2); // Estado para controlar o ganho

  const tuneString = (string, frequency) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(gain, audioContext.currentTime); // Aplica o ganho atual

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillatorRef.current = oscillator;
  };

  const toggleSound = (event, isCavaquinho = false) => {
    const string = event.target.dataset.string;
    const frequency = isCavaquinho ? cavaquinhoTuning[string] : tuning[string];

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

  const handleGainChange = (event) => {
    setGain(parseFloat(event.target.value)); // Atualiza o ganho baseado no valor do slider
  };

  return (
    <div>
      <h1>Violão</h1>
      <br />
      <div>
        <button onClick={(e) => toggleSound(e, false)} data-string="E">
          6ªE
        </button>
        <button onClick={(e) => toggleSound(e, false)} data-string="A">
          5ªA
        </button>
        <button onClick={(e) => toggleSound(e, false)} data-string="D">
          4ªD
        </button>
        <button onClick={(e) => toggleSound(e, false)} data-string="G">
          3ªG
        </button>
        <button onClick={(e) => toggleSound(e, false)} data-string="B">
          2ªB
        </button>
        <button onClick={(e) => toggleSound(e, false)} data-string="e">
          1ªe
        </button>
      </div>
      <br />
      <hr />
      <h1>Cavaquinho</h1>
      <br />
      <div>
        <button onClick={(e) => toggleSound(e, true)} data-string="D4">
          1ªD
        </button>
        <button onClick={(e) => toggleSound(e, true)} data-string="B3">
          2ªB
        </button>
        <button onClick={(e) => toggleSound(e, true)} data-string="G4">
          3ªG
        </button>
        <button onClick={(e) => toggleSound(e, true)} data-string="D4_2">
          4ªD
        </button>
      </div>
      {currentNote && <p>Nota atual: {currentNote}</p>}
      <input type="range" min="0" max="5" step="1" value={gain} onChange={handleGainChange} />
      <label htmlFor="gain">Volume: {gain.toFixed(2)}</label>
    </div>
  );
};

export default Tuner;

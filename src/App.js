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
    D: 293.66,
    G: 392.00,
    B: 493.88,
    d: 587.32,
  });

  const [currentNote, setCurrentNote] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [clickedLink, setClickedLink] = useState(null); // Novo estado para rastrear o link clicado
  const oscillatorRef = useRef(null);
  const [gain, setGain] = useState();

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
    setGain(parseFloat(event.target.value));
  };

  const handleLinkClick = (instrument) => {
    setSelectedInstrument(instrument);
    setClickedLink(instrument);
  };

  const renderTunerButtons = (isCavaquinho = false) => {
    const instrumentTuning = isCavaquinho ? cavaquinhoTuning : tuning;
    return (
      <div>
        {Object.keys(instrumentTuning).map((string) => (
          <button key={string} onClick={(e) => toggleSound(e, isCavaquinho)} data-string={string}>
            {string}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='circulo' >
      <h1>Afinadores</h1>
      <div>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('violao'); }} 
          className={clickedLink === 'violao' ? 'link clicked' : 'link'}
        >
          Violão
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('cavaquinho'); }} 
          className={clickedLink === 'cavaquinho' ? 'link clicked' : 'link'}
        >
          Cavaquinho
        </a>
      </div>
      {selectedInstrument === 'violao' && (
        <div className='h1' ><br /><br />
          {renderTunerButtons(false)}
        </div>
      )}
      {selectedInstrument === 'cavaquinho' && (
        <div className='h1'><br /><br />
          {renderTunerButtons(true)}
        </div>
      )}
      {currentNote && <p>Nota atual: {currentNote}</p>}
      <input type="range" min="0" max="5" step="1" value={gain} onChange={handleGainChange} />
      <label htmlFor="gain">Volume: {gain.toFixed(1)}</label>
    </div>
  );
};

export default Tuner;

import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';
import Sound from 'react-sound';
import audioFile from './audio.mp3';
import './AnimatedLetters.css';


function AnimatedLetters() {
  const letters = ['H', 'n', 'i', 'c'];
  const positions = [
    { top: '0px', left: '0px' },
    { top: '0px', right: '0px' },
    { bottom: '0px', left: '0px' },
    { bottom: '0px', right: '0px' },
  ];
  const trail = useTrail(letters.length, {
    from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  function handlePlay() {
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleVolumeChange(value) {
    setVolume(value);
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {trail.map((props, index) => (
        <animated.span
          key={index}
          style={{
            ...props,
            position: 'absolute',
            fontSize: '3rem',
            ...positions[index],
          }}
        >
          {letters[index]}
        </animated.span>
      ))}
      <div>
        {isPlaying && (
          <Sound
            url={audioFile}
            playStatus={Sound.status.PLAYING}
            volume={volume}
            onFinishedPlaying={handlePause}
          />
        )}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
}

export default AnimatedLetters;

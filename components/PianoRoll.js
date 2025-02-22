// components/PianoRoll.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import * as Tone from 'tone';
import { getChordProgression } from '../lib/aiMusic';

const NUM_STEPS = 16;
const PITCHES = [
  'C5', 'B4', 'A4', 'G4', 'F4',
  'E4', 'D4', 'C4', 'B3', 'A3',
];

// Utility to create a blank 2D grid
function createEmptyGrid() {
  return Array(PITCHES.length)
    .fill(null)
    .map(() => Array(NUM_STEPS).fill(false));
}

let socket; // We'll store our Socket.io client here

export default function PianoRoll() {
  const [grid, setGrid] = useState(createEmptyGrid);

  useEffect(() => {
    // Connect to Socket.io
    socket = io(); // By default, connects to the same origin/port

    // Log connection
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    // Receive updated grid from other clients (via server)
    socket.on('grid-update', (newGrid) => {
      setGrid(newGrid);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Toggle a note in the grid
  const toggleNote = (row, col) => {
    const updatedGrid = grid.map((r) => [...r]);
    updatedGrid[row][col] = !updatedGrid[row][col];
    setGrid(updatedGrid);

    // Send to server
    socket.emit('grid-update', updatedGrid);
  };

  // Play the current grid with Tone.js
  const handlePlay = async () => {
    await Tone.start(); // ensure AudioContext is started
    const synth = new Tone.PolySynth().toDestination();

    // Reset the Transport
    Tone.Transport.cancel();
    Tone.Transport.stop();
    Tone.Transport.position = 0;

    // Each column is an 8th note
    const stepDuration = '8n';

    for (let col = 0; col < NUM_STEPS; col++) {
      for (let row = 0; row < PITCHES.length; row++) {
        if (grid[row][col]) {
          const pitch = PITCHES[row];
          const time = `${col} * ${stepDuration}`;
          synth.triggerAttackRelease(pitch, '8n', Tone.Time(time));
        }
      }
    }

    Tone.Transport.start();
  };

  // Basic AI chord suggestion
  const handleAISuggestion = async () => {
    const chords = await getChordProgression();
    alert('AI-suggested chords: ' + chords.join(' - '));
    // In a real app, you'd integrate these chords into the grid
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Piano Roll Editor</h2>
      <div style={{ margin: '1rem 0' }}>
        <button onClick={handlePlay} style={{ marginRight: '0.5rem' }}>
          Play
        </button>
        <button onClick={handleAISuggestion}>Suggest Chords</button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${NUM_STEPS}, 30px)`,
          gridTemplateRows: `repeat(${PITCHES.length}, 30px)`,
          gap: '2px',
        }}
      >
        {grid.map((rowArray, rowIndex) =>
          rowArray.map((isActive, colIndex) => {
            const backgroundColor = isActive ? '#0fc' : '#fff';
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => toggleNote(rowIndex, colIndex)}
                style={{
                  width: '30px',
                  height: '30px',
                  border: '1px solid #888',
                  cursor: 'pointer',
                  backgroundColor,
                }}
                title={`Pitch: ${PITCHES[rowIndex]}, Step: ${colIndex}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}


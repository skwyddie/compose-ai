// lib/aiMusic.js
import * as mm from '@magenta/music';

export async function getChordProgression() {
  // Example usage of a real model might be:
  // const model = new mm.ChordRNN('<MODEL_URL>');
  // await model.initialize();
  // const seed = { chords: ['C'] };
  // const generated = await model.continueSequence(seed, 8, 1.0);
  // parse the generated chords from 'generated' ...

  // For now, just pick 4 random chords
  const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bb', 'Bdim'];
  const suggestion = [];
  for (let i = 0; i < 4; i++) {
    suggestion.push(chords[Math.floor(Math.random() * chords.length)]);
  }
  return suggestion;
}


# compose-ai

A minimal Next.js application with:

- **Socket.io** for real-time collaboration  
- **Tone.js** for audio playback  
- **Magenta.js** for AI chord suggestions  
- A custom **server.js** to run Next.js + Socket.io together  

This project demonstrates a simple, **real-time** piano roll that multiple users can edit simultaneously, plus basic AI chord suggestions powered by Magenta.

## Project Structure

compose-ai/
├─ package.json
├─ server.js
├─ pages/
│  └─ index.js
├─ components/
│  └─ PianoRoll.js
├─ lib/
│  └─ aiMusic.js
└─ README.md

- **server.js**: A custom Express/Socket.io server that also runs Next.js.  
- **pages/index.js**: Main Next.js page that dynamically imports the `PianoRoll` component.  
- **components/PianoRoll.js**: Core React component with a 2D grid (rows = pitches, cols = time steps). Real-time updates via Socket.io.  
- **lib/aiMusic.js**: Demonstrates how to integrate Magenta.js for chord/melody suggestions (currently uses a random chord generator).

## Installation & Development

1. **Clone or Open via GitHub Codespaces**

   ```bash
   git clone https://github.com/skwyddie/music-maker.git
   cd music-maker
   ```

   If you’re using Codespaces, just open the repo directly in a codespace.

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run in Development Mode**

   ```bash
   npm run dev
   ```

   - Starts the custom server on `http://localhost:3000`.
   - Uses `server.js` so that both Next.js **and** Socket.io run together.
   - Supports hot reloading.  

4. **Open the App**

   - Visit `http://localhost:3000` (or the forwarded port in Codespaces).
   - You’ll see a **Piano Roll** grid. Click cells to toggle notes on/off.

5. **Real-Time Collaboration**

   - Open multiple browser tabs or share your Codespaces preview URL with others.
   - Any toggles in one browser will instantly appear in all others.

6. **Production Build**

   ```bash
   npm run build
   npm run start
   ```
   
   - Builds the Next.js app into a production-ready bundle.
   - Runs on `http://localhost:3000` using the **server.js** file in production mode.

## Features

- **2D Piano Roll Grid**: Each column represents a time step; each row represents a pitch (e.g., C4, D4, etc.).  
- **Socket.io**: Keeps the grid in sync across all connected clients.  
- **Tone.js Playback**: Press the **"Play"** button to play back any selected cells in sequence.  
- **AI Chord Suggestions**: Click the **"Suggest Chords"** button for a basic (currently random) chord progression demonstration via Magenta.js.  

## Next Steps & Customization

- **Integrate a Real Magenta Model**:  
  - Edit `lib/aiMusic.js` to load and use a real chord or melody model (e.g., a chordRNN or melodyRNN checkpoint).  
- **Enhance the UI**:  
  - Add click-and-drag functionality to “paint” notes.  
  - Show the pitch names along the vertical axis, measure labels across the horizontal axis, etc.  
- **Persist Data**:  
  - Use a database (MongoDB, PostgreSQL, Firebase, etc.) to save your projects or user accounts.  
- **Deployment**:  
  - Deploy to a service that can run Node servers (e.g., Render, Railway, or Heroku).  
  - Since Socket.io needs a persistent server, Vercel serverless alone is usually not sufficient unless you configure a separate server.  

## Contributing

Feel free to fork or clone this repository and open pull requests with improvements. Because it’s a simple starting point, there’s plenty of room to expand features, refine the UI, and integrate more advanced AI generation flows.

## License

[MIT](LICENSE) – You’re free to use, modify, and distribute this code as you like. Enjoy building your **compose-ai** or “music-maker” project!
```

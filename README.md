# T3 – Tic Tac Toe

A simple browser-based Tic Tac Toe game with Player vs Player and Player vs AI (minimax) modes.

## Features
- PvP and PvAI modes with a dedicated mode selection screen
- Responsive 3×3 board with turn status
- Reset to restart and Back to return to mode selection
- AI uses minimax for optimal play as `O`, with a short move delay and input lock during AI turns
- Single-page deployment configured via `vercel.json` rewrite to `index.html`

## Getting Started
- Local: open `index.html` in a browser, or serve the `TicTacToe` folder with any static server
- Development: edit `script.js`, `style.css`, and `index.html`; no build step is required

## Project Structure
- `index.html` – markup for home, mode selection, and game pages
- `script.js` – game logic, mode handling, and minimax AI
- `style.css` – styles
- `vercel.json` – SPA rewrite to `index.html`
- `.vercel/` – deployment metadata

## How to Play
- Click `Play`, choose a mode, then take turns clicking cells
- `X` always starts
- Use `Reset` to restart and `Back` to change mode

## Deployment
- Optimized for Vercel. From the `TicTacToe` folder, deploy with your preferred static hosting; the provided `vercel.json` handles SPA routing.

## Author
xzyqrn

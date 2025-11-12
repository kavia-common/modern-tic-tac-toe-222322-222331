# Modern Tic Tac Toe (React)

A modern, accessible Tic Tac Toe game built with React, styled using the Ocean Professional theme (blue primary, amber accent), and designed for responsiveness and keyboard accessibility.

## Features

- 3x3 Game Board with smooth hover/press transitions, rounded corners, and subtle shadows
- Status Display (current player, winner, draw)
- Player Indicator chip (color-coded)
- Reset Button
- Keyboard Navigation:
  - Arrow keys to move focus between cells
  - Enter/Space to place mark
- Accessibility: ARIA roles/labels, aria-live status, focus styles
- Responsive design (board cells adapt on small screens)
- Minimal state management (React useState/useMemo)

## Components

- `components/Square.js` — Focusable, accessible square
- `components/GameBoard.js` — 3x3 grid, ARIA role="grid"
- `components/GameStatus.js` — Status/outcome display with aria-live
- `components/PlayerIndicator.js` — Current player chip
- `pages/Game.js` — Game page with logic, keyboard navigation, and reset

## Getting Started

From the `frontend_app` directory:

- Development: `npm start` (opens http://localhost:3000)
- Tests: `npm test`
- Build: `npm run build`

Navigation:
- Home: overview and links
- Game: `/game`
- Login (demo form): `/login`

## Environment Variables

The app reads standard React env vars if present. No external services are required.
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_PORT
- REACT_APP_LOG_LEVEL
- REACT_APP_FEATURE_FLAGS
- etc.

Note: For this game, env vars are not required.

## Accessibility Notes

- Board uses role="grid"; squares act as buttons with keyboard support.
- `aria-live="polite"` is used in status for screen readers.
- Focus ring and color contrast follow Ocean Professional theme.

## License

Internal demo template for KAVIA tasks.

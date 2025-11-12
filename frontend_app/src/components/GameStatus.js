import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GameStatus
 * Displays the current game status text with aria-live for screen readers.
 *
 * @param {Object} props
 * @param {string} props.text - Status text
 */
export default function GameStatus({ text }) {
  return (
    <p
      style={{
        margin: '6px 0 0',
        color: 'rgba(17,24,39,0.7)',
        fontSize: '0.95rem',
      }}
      aria-live="polite"
      data-testid="game-status"
    >
      {text}
    </p>
  );
}

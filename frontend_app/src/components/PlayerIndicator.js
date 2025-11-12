import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PlayerIndicator
 * Shows current player with colored badge.
 *
 * @param {Object} props
 * @param {'X'|'O'} props.player
 */
export default function PlayerIndicator({ player }) {
  const color =
    player === 'X' ? 'var(--ocean-primary)' : 'var(--ocean-secondary)';
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 999,
        background: 'rgba(17,24,39,0.04)',
        border: '1px solid rgba(17,24,39,0.06)',
      }}
      aria-label={`Current player ${player}`}
    >
      <span
        aria-hidden
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: color,
          boxShadow:
            player === 'X'
              ? '0 0 0 3px rgba(37,99,235,0.15)'
              : '0 0 0 3px rgba(245,158,11,0.15)',
        }}
      />
      <strong style={{ color: 'var(--ocean-text)' }}>Player {player}</strong>
    </div>
  );
}

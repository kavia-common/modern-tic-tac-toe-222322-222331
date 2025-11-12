import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square
 * An accessible, focusable square for the Tic Tac Toe board.
 * - Handles click and keyboard space/enter to trigger onSelect
 * - Applies Ocean Professional theme styles via inline CSS and CSS variables
 *
 * @param {Object} props
 * @param {string|null} props.value - 'X' | 'O' | null
 * @param {boolean} props.disabled - disable interactions
 * @param {function} props.onSelect - selection handler
 * @param {boolean} props.isWinning - whether this square is part of a winning line
 * @param {boolean} props.isFocused - whether the square is the current keyboard target
 * @param {string} [props.ariaLabel] - aria label for accessibility
 */
// PUBLIC_INTERFACE
export default function Square({
  value,
  disabled,
  onSelect,
  isWinning,
  isFocused,
  ariaLabel,
}) {
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={0}
      onClick={() => !disabled && onSelect()}
      onKeyDown={handleKeyDown}
      className="board-cell"
      style={{
        height: 108,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ocean-bg)',
        borderRadius: 16,
        border: isWinning
          ? '2px solid var(--ocean-secondary)'
          : '1px solid rgba(17,24,39,0.08)',
        boxShadow: isFocused
          ? '0 0 0 4px rgba(37,99,235,0.25), var(--shadow-soft)'
          : 'var(--shadow-soft)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--transition-base)',
        outline: 'none',
        userSelect: 'none',
      }}
      data-testid="square"
    >
      <span
        style={{
          fontSize: 36,
          fontWeight: 900,
          letterSpacing: 1,
          color:
            value === 'X'
              ? 'var(--ocean-primary)'
              : value === 'O'
              ? 'var(--ocean-secondary)'
              : 'rgba(17,24,39,0.35)',
          opacity: value ? 1 : 0.7,
        }}
      >
        {value || ''}
      </span>
    </div>
  );
}

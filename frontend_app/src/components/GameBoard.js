import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * GameBoard
 * Renders a 3x3 grid of Squares with accessibility attributes.
 *
 * @param {Object} props
 * @param {Array<(null|'X'|'O')>} props.board - Board state array length 9
 * @param {number} props.focusedIndex - currently focused cell index 0..8
 * @param {(idx:number)=>void} props.onSelect - selection handler per index
 * @param {(idx:number)=>boolean} props.isWinningCell - predicate for winning cells
 * @param {boolean} props.disabled - disable interactions when game over
 */
export default function GameBoard({
  board,
  focusedIndex,
  onSelect,
  isWinningCell,
  disabled,
}) {
  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board, 3 by 3"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        padding: 8,
        background: '#fff',
        borderRadius: '12px',
      }}
    >
      {board.map((val, idx) => {
        const label = `Cell ${idx + 1}, ${val ? val : 'empty'}`;
        const isFocused = focusedIndex === idx;
        const cellDisabled = Boolean(disabled || val);

        return (
          <Square
            key={idx}
            value={val}
            disabled={cellDisabled}
            isWinning={isWinningCell(idx)}
            isFocused={isFocused}
            ariaLabel={label}
            onSelect={() => onSelect(idx)}
          />
        );
      })}
    </div>
  );
}

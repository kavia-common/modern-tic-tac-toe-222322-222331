import React, { useMemo, useState, useEffect, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Game
 * A UI-only Tic Tac Toe game page with a 3x3 grid, Ocean Professional theme, accessibility, and keyboard support.
 * - Features:
 *   - 3x3 grid with hover/active states, rounded corners, soft shadows
 *   - Current player indicator, win/draw status display
 *   - Restart button
 *   - Responsive and centered layout with subtle gradient background
 *   - Accessible: role="button", aria-labels, keyboard navigation (arrow keys), Enter/Space to place mark
 */
function Game() {
  // Board is an array of 9 cells with null | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Compute winner and status
  const winner = useMemo(() => calculateWinner(board), [board]);

  const isDraw = useMemo(() => {
    return !winner && board.every((c) => c !== null);
  }, [board, winner]);

  const currentPlayer = xIsNext ? 'X' : 'O';

  const statusText = useMemo(() => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (isDraw) {
      return 'Draw';
    }
    return `Current Player: ${currentPlayer}`;
  }, [winner, isDraw, currentPlayer]);

  const handleCellClick = (idx) => {
    if (winner || isDraw) return;
    if (board[idx] !== null) return;
    const next = board.slice();
    next[idx] = currentPlayer;
    setBoard(next);
    setXIsNext((prev) => !prev);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setFocusedIndex(0);
  };

  // Keyboard navigation within grid
  const moveFocus = useCallback((dir) => {
    // dir: 'up' | 'down' | 'left' | 'right'
    const row = Math.floor(focusedIndex / 3);
    const col = focusedIndex % 3;
    let nextRow = row;
    let nextCol = col;
    if (dir === 'up') nextRow = (row + 2) % 3;
    if (dir === 'down') nextRow = (row + 1) % 3;
    if (dir === 'left') nextCol = (col + 2) % 3;
    if (dir === 'right') nextCol = (col + 1) % 3;
    setFocusedIndex(nextRow * 3 + nextCol);
  }, [focusedIndex]);

  // Handle keyboard at document level to keep UX simple
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowUp') moveFocus('up');
      if (e.key === 'ArrowDown') moveFocus('down');
      if (e.key === 'ArrowLeft') moveFocus('left');
      if (e.key === 'ArrowRight') moveFocus('right');
      if (e.key === 'Enter' || e.key === ' ') {
        handleCellClick(focusedIndex);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [focusedIndex, moveFocus]); // eslint-disable-line react-hooks/exhaustive-deps

  // Derived winning cells for styling
  const winningLine = useMemo(() => getWinningLine(board), [board]);
  const isWinningCell = (idx) => winningLine?.includes(idx);

  return (
    <main
      className="game-page"
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background:
          'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(249, 250, 251, 1))',
      }}
    >
      <section
        className="game-container"
        aria-labelledby="game-title"
        style={{
          width: '100%',
          maxWidth: 520,
        }}
      >
        <div
          className="surface-card"
          style={{
            background: 'var(--ocean-surface)',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-subtle)',
            padding: 24,
            border: '1px solid rgba(17,24,39,0.06)',
          }}
        >
          <header
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}
          >
            <div>
              <h1
                id="game-title"
                style={{
                  margin: 0,
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--ocean-text)',
                }}
              >
                Tic Tac Toe
              </h1>
              <p
                style={{
                  margin: '6px 0 0',
                  color: 'rgba(17,24,39,0.7)',
                  fontSize: '0.95rem',
                }}
                aria-live="polite"
              >
                {statusText}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="btn-primary"
              aria-label="Restart game"
              style={{
                width: 'auto',
                padding: '10px 14px',
                borderRadius: 12,
                fontWeight: 700,
                background: 'var(--ocean-secondary)',
                boxShadow: '0 6px 14px rgba(245,158,11,0.25)',
              }}
            >
              Restart
            </button>
          </header>

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
              const isFocused = focusedIndex === idx;
              const label = `Cell ${idx + 1}, ${val ? val : 'empty'}`;
              const disabled = Boolean(winner || isDraw || val);

              return (
                <div
                  key={idx}
                  role="button"
                  aria-label={label}
                  aria-pressed={false}
                  aria-disabled={disabled}
                  tabIndex={0}
                  onClick={() => handleCellClick(idx)}
                  className="board-cell"
                  style={{
                    height: 108,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--ocean-bg)',
                    borderRadius: 16,
                    border: isWinningCell(idx)
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
                >
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      letterSpacing: 1,
                      color: val === 'X'
                        ? 'var(--ocean-primary)'
                        : val === 'O'
                        ? 'var(--ocean-secondary)'
                        : 'rgba(17,24,39,0.35)',
                      opacity: val ? 1 : 0.7,
                    }}
                  >
                    {val || ''}
                  </span>
                </div>
              );
            })}
          </div>

          <footer style={{ marginTop: 16 }}>
            <small
              style={{ color: 'rgba(17,24,39,0.6)' }}
            >
              Navigate with arrow keys. Press Enter or Space to place a mark.
            </small>
          </footer>
        </div>
      </section>
    </main>
  );
}

// PUBLIC_INTERFACE
export default Game;

/**
 * PUBLIC_INTERFACE
 * calculateWinner
 * Determine the winner for a Tic Tac Toe board.
 * @param {Array<(null|'X'|'O')>} squares - board state of length 9
 * @returns {('X'|'O'|null)} The winner symbol or null if no winner.
 */
export function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * getWinningLine
 * Return the specific winning line if it exists.
 * @param {Array<(null|'X'|'O')>} squares - board state of length 9
 * @returns {number[] | null} An array of indices representing the winning line, or null if no win.
 */
export function getWinningLine(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

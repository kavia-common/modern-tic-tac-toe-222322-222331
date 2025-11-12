import { calculateWinner, getWinningLine } from './Game';

describe('calculateWinner', () => {
  test('detects row win', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(calculateWinner(board)).toBe('X');
  });

  test('detects column win', () => {
    const board = ['O', null, null, 'O', null, null, 'O', null, null];
    expect(calculateWinner(board)).toBe('O');
  });

  test('detects diagonal win', () => {
    const board = ['X', null, null, null, 'X', null, null, null, 'X'];
    expect(calculateWinner(board)).toBe('X');
  });

  test('returns null when no win', () => {
    const board = [null, null, null, null, null, null, null, null, null];
    expect(calculateWinner(board)).toBeNull();
  });
});

describe('getWinningLine', () => {
  test('returns winning indices', () => {
    const board = ['O', 'O', 'O', null, null, null, null, null, null];
    expect(getWinningLine(board)).toEqual([0, 1, 2]);
  });

  test('returns null when no win', () => {
    const board = [null, null, null, null, null, null, null, null, null];
    expect(getWinningLine(board)).toBeNull();
  });
});

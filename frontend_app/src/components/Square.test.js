import { render, screen, fireEvent } from '@testing-library/react';
import Square from './Square';

test('Square triggers onSelect on Enter/Space', () => {
  const onSelect = jest.fn();
  render(<Square value={null} disabled={false} onSelect={onSelect} isWinning={false} isFocused={false} ariaLabel="Cell 1, empty" />);
  const square = screen.getByRole('button', { name: /cell 1/i });
  fireEvent.keyDown(square, { key: 'Enter' });
  fireEvent.keyDown(square, { key: ' ' });
  expect(onSelect).toHaveBeenCalledTimes(2);
});

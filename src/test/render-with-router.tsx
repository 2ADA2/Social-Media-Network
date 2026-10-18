import { MemoryRouter } from 'react-router-dom';
import { render } from 'vitest-browser-react';

export function renderWithRouter(children: React.ReactElement) {
  return render(<MemoryRouter>{children}</MemoryRouter>);
}

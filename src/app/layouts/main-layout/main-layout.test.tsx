import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MainLayout } from './';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

function renderWithRouter(
  children: React.ReactElement,
  { route = '/', hiddenNav = false } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={<MainLayout hiddenNav={hiddenNav} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('MainLayout component', () => {
  test('renders header, footer and content', async () => {
    const screen = await renderWithRouter(<div> children </div>);

    await expect.element(screen.getByText('children')).toBeVisible();
    await expect.element(screen.getByRole('contentinfo')).toBeVisible();
    await expect.element(screen.getByRole('main')).toBeVisible();
    await expect.element(screen.getByRole('banner')).toBeVisible();
  });
});

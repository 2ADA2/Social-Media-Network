import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';

describe('ProtectedRoute', () => {
  test('renders outlet when condition is true', async () => {
    const screen = await render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute condition={true} route="/login" />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await expect.element(screen.getByText('Protected Content')).toBeVisible();
  });

  test('redirects when condition is false', async () => {
    const screen = await render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute condition={false} route="/login" />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await expect.element(screen.getByText('Login')).toBeVisible();
    expect(screen.getByText('Protected Content').query()).toBeNull();
  });
});

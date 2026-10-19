import { describe, expect, test, vi, beforeEach } from 'vitest';
import { fetchLogout } from './logout';

describe('logoutRequerst', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  test('sends POST request', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
    } as Response);

    await fetchLogout();

    expect(fetch).toHaveBeenCalledWith('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
  });

  test('throws error when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 500 } as Response);

    await expect(fetchLogout()).rejects.toThrow('logout failed:500');
  });
});

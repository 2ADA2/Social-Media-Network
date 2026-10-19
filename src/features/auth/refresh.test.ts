import { describe, expect, test, vi, beforeEach } from 'vitest';
import { refreshRequest } from './refresh';

describe('refreshRequest', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  test('sends POST request with credentials', async () => {
    const mockResponse = {
      token: 'token',
      refreshToken: 'refresh-token',
      expiresIn: 7200,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await refreshRequest();

    expect(fetch).toHaveBeenCalledWith('/api/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    expect(result).toEqual(mockResponse);
  });

  test('throws error when response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(refreshRequest()).rejects.toThrow('Refresh failed');
  });
});

import { describe, expect, test, vi, beforeEach } from 'vitest';
import { signinRequest } from './signin';
import { mockUserResponse } from '@/test/mockUsers';

describe('signinRequest', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  test('sends correct request', async () => {
    const params = { email: 'test@mail.com', password: 'password123' };
    const mockResponse = {
      user: mockUserResponse,
      token: 'access-token',
      refreshToken: 'refresh-token',
      expiresIn: 7200,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await signinRequest(params);

    expect(fetch).toHaveBeenCalledWith('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    });
    expect(result).toEqual(mockResponse);
  });

  test('throws error with server message when !res.ok', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    } as Response);

    await expect(
      signinRequest({ email: 'test@mail.com', password: 'wrong' }),
    ).rejects.toThrow('Invalid credentials');
  });

  test('throws fallback error when body is not JSON', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error('Not JSON');
      },
    } as unknown as Response);

    await expect(
      signinRequest({ email: 'test@mail.com', password: 'wrong' }),
    ).rejects.toThrow('Auth unknown error');
  });
});

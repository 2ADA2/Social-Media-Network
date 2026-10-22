import { describe, expect, test, vi, beforeEach } from 'vitest';
import { signupRequest } from './signup';
import { mockUserResponse } from '@/test/mockUsers';

describe('signupRequest', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  test('sends correct request', async () => {
    const params = {
      email: 'test@mail.com',
      password: 'password123',
      firstName: 'Alice',
      secondName: 'Smith',
    };
    const mockResponse = {
      message: 'User created',
      user: mockUserResponse,
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await signupRequest(params);

    expect(fetch).toHaveBeenCalledWith('/api/signup', {
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
      json: async () => ({ message: 'Email already taken' }),
    } as Response);

    await expect(
      signupRequest({
        email: 'test@mail.com',
        password: 'password123',
        firstName: 'Alice',
        secondName: 'Smith',
      }),
    ).rejects.toThrow('Email already taken');
  });

  test('throws fallback error when body is not JSON', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error('Not JSON');
      },
    } as unknown as Response);

    await expect(
      signupRequest({
        email: 'test@mail.com',
        password: 'password123',
        firstName: 'Alice',
        secondName: 'Smith',
      }),
    ).rejects.toThrow('Signup failed');
  });
});

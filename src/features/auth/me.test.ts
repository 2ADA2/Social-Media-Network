import { apiClient } from '@/shared/api/api-client';
import { mockUserResponse } from '@/test/mockUsers';
import { AxiosError } from 'axios';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { fetchMe } from './me';

vi.mock('@/shared/api/api-client', async () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('meRequerst', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  test('sends POST request', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockUserResponse });

    const responce = await fetchMe();

    expect(apiClient.get).toHaveBeenCalledWith('/api/me');

    expect(responce.name).toBe(mockUserResponse.firstName);
  });

  test('throws error when response is not ok', async () => {
    vi.mocked(apiClient.get).mockRejectedValue(
      new AxiosError('Request failed with status code 500'),
    );

    await expect(fetchMe).rejects.toThrow();
  });
});

import { httpClient } from '../httpClient';

// Constants
import { ERROR_MESSAGES, ERROR_STATUS } from '@/constants';

global.fetch = jest.fn();

describe('HttpService', () => {
  const mockEndpoint = 'test-endpoint';
  const mockPayload = { key: 'value' };
  const mockToken = 'mock-token';
  const mockResponse = { success: true };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFetch = (status: number, response: any) => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      json: jest.fn().mockResolvedValue(response),
    });
  };

  it('Should send a GET request', async () => {
    mockFetch(200, mockResponse);

    const result = await httpClient.get({
      endpoint: mockEndpoint,
      token: mockToken,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockEndpoint),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('Should send a POST request', async () => {
    mockFetch(201, mockResponse);

    const result = await httpClient.post({
      endpoint: mockEndpoint,
      payload: mockPayload,
      token: mockToken,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockEndpoint),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockPayload),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('Should send a PUT request', async () => {
    mockFetch(200, mockResponse);

    const result = await httpClient.put({
      endpoint: mockEndpoint,
      payload: mockPayload,
      token: mockToken,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockEndpoint),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(mockPayload),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('Should send a PATCH request', async () => {
    mockFetch(200, mockResponse);

    const result = await httpClient.patch({
      endpoint: mockEndpoint,
      payload: mockPayload,
      token: mockToken,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockEndpoint),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify(mockPayload),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('Should send a DELETE request', async () => {
    mockFetch(200, mockResponse);

    const result = await httpClient.delete({
      endpoint: mockEndpoint,
      token: mockToken,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockEndpoint),
      expect.objectContaining({
        method: 'DELETE',
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('Should handle 204 No Content', async () => {
    mockFetch(ERROR_STATUS.NO_CONTENT, null);

    const result = await httpClient.get({ endpoint: mockEndpoint });

    expect(result).toBeNull();
  });

  it('Should handle API errors', async () => {
    mockFetch(400, { error: { message: 'Bad Request' } });

    await expect(httpClient.get({ endpoint: mockEndpoint })).rejects.toThrow(
      'Bad Request',
    );
  });

  it('Should handle API errors with default error message', async () => {
    mockFetch(400, { error: { message: '' } });

    await expect(httpClient.get({ endpoint: mockEndpoint })).rejects.toThrow(
      `Error: 400 - `,
    );
  });

  it('Should handle network errors', async () => {
    (fetch as jest.Mock).mockRejectedValue(
      new Error(ERROR_MESSAGES.DEFAULT_API_ERROR),
    );

    await expect(httpClient.get({ endpoint: mockEndpoint })).rejects.toThrow(
      ERROR_MESSAGES.DEFAULT_API_ERROR,
    );
  });

  it('Should throw DEFAULT_API_ERROR when an unknown error occurs', async () => {
    (fetch as jest.Mock).mockRejectedValue('Unknown error');

    await expect(httpClient.get({ endpoint: mockEndpoint })).rejects.toThrow(
      ERROR_MESSAGES.DEFAULT_API_ERROR,
    );
  });
});

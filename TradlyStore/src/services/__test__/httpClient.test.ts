import { httpClient } from '../httpClient';

describe('HttpService', () => {
  const mockEndpoint = 'test-endpoint';
  const mockPayload = { key: 'value' };
  const mockToken = 'mock-token';
  const mockResponse = { success: true };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  const mockFetch = (status: number, response: any) => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      json: async () => response,
      headers: {
        get: jest.fn(() => 'application/json'),
      },
    });
  };

  it('Should make a GET request successfully', async () => {
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

  it('Should make a POST request successfully', async () => {
    mockFetch(200, mockResponse);

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
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
          'Content-Type': 'application/json',
        }),
      }),
    );

    expect(result).toEqual(mockResponse);
  });

  it('Should handle error response', async () => {
    const errorMessage = 'Bad Request';
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      statusText: errorMessage,
      json: async () => ({ message: errorMessage }),
      headers: {
        get: jest.fn(() => 'application/json'),
      },
    });

    await expect(
      httpClient.get({
        endpoint: mockEndpoint,
        token: mockToken,
      }),
    ).rejects.toThrow(errorMessage);
  });

  it('Should make a PUT request successfully', async () => {
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

  it('Should make a PATCH request successfully', async () => {
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

  it('Should make a DELETE request successfully', async () => {
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
});

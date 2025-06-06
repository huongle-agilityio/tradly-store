import perf from '@react-native-firebase/perf';

// Constants
import { BASE_API, ERROR_MESSAGES, ERROR_STATUS } from '@/constants';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface RequestInitExtended extends Omit<globalThis.RequestInit, 'body'> {
  baseUrl?: string;
}

interface IApiClient<T> {
  endpoint: string;
  method: string;
  payload?: T;
  token?: string;
  options?: RequestInitExtended;
}

interface ApiProps<T> {
  endpoint: string;
  payload: T;
  token?: string;
  options?: RequestInitExtended;
}

class HttpService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = BASE_API || '';
  }

  /**
   * Performs an HTTP request and returns the response as a promise.
   *
   * @template TResponse - The type of the response.
   * @template TPayload - The type of the request body.
   * @param {IApiClient<TPayload>} options - The options for the request.
   * @param {string} options.endpoint - The API endpoint to request.
   * @param {string} options.method - The HTTP method to use.
   * @param {TPayload} [options.body] - The request body.
   * @param {string} [options.token] - The authentication token to include in the request.
   * @param {globalThis.RequestInit} [options.options] - Additional request options.
   * @returns {Promise<TResponse>} The response from the API.
   * @throws If the response is not ok.
   */
  private async createRequest<TResponse, TPayload = undefined>({
    endpoint,
    method,
    payload,
    token,
    options,
  }: IApiClient<TPayload>): Promise<TResponse> {
    const baseUrl = this.apiUrl;
    const url = `${baseUrl}api/${endpoint}`;

    const initOptions: globalThis.RequestInit = {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (payload) {
      initOptions.body = JSON.stringify(payload);
    }

    const metric = await perf().newHttpMetric(url, method as any);
    await metric.start();

    try {
      const response = await fetch(url, initOptions);

      metric.setHttpResponseCode(response.status);
      metric.setResponseContentType(response.headers.get('Content-Type'));
      metric.setResponsePayloadSize(
        Number(response.headers.get('Content-Length')),
      );

      if (!response.ok) {
        const error = await response.json();

        throw new Error(
          error?.error?.message ||
            error?.message ||
            `Error: ${response.status} - ${response.statusText}`,
        );
      }

      if (response.status === ERROR_STATUS.NO_CONTENT) {
        return null as TResponse;
      }

      return await response?.json();
    } catch (error) {
      metric.putAttribute('error', 'true');
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(ERROR_MESSAGES.DEFAULT_API_ERROR);
    } finally {
      await metric.stop();
    }
  }

  /**
   * Sends a GET request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string} [token] - Optional authorization token for the request.
   * @param {globalThis.RequestInit} [options] - Optional additional request options.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async get<TResponse>({
    endpoint,
    token,
    options,
  }: Omit<ApiProps<TResponse>, 'payload'>): Promise<TResponse> {
    return this.createRequest<TResponse>({
      endpoint,
      method: HttpMethod.GET,
      token,
      options,
    });
  }

  /**
   * Sends a POST request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @template TPayload - The type of data to send in the request body.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the request body.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async post<TResponse, TPayload>({
    endpoint,
    payload,
    token,
    options,
  }: ApiProps<TPayload>): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.POST,
      payload,
      token,
      options,
    });
  }

  /**
   * Sends a PUT request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @template TPayload - The type of the payload to send with the request.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to send with the request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async put<TResponse, TPayload>({
    endpoint,
    payload,
    token,
    options,
  }: ApiProps<TPayload>): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.PUT,
      payload,
      token,
      options,
    });
  }

  /**
   * Sends a PATCH request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the PATCH request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async patch<TResponse, TPayload>({
    endpoint,
    payload,
    token,
    options,
  }: ApiProps<TPayload>): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.PATCH,
      payload,
      token,
      options,
    });
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the DELETE request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async delete<TResponse>({
    endpoint,
    token,
    options,
  }: Omit<ApiProps<TResponse>, 'payload'>): Promise<TResponse> {
    return this.createRequest<TResponse>({
      endpoint,
      method: HttpMethod.DELETE,
      token,
      options,
    });
  }
}

export const httpClient = new HttpService();

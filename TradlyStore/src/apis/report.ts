// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Utils
import { getErrorMessage } from '@/utils';

interface Report {
  date: string;
  time: string;
  report: {
    timeToRenderMillis: number;
    timeToBootJsMillis: number;
  };
}

export interface ReportResponse {
  data: Report;
}

/**
 * Creates a report on the server.
 *
 * @param {Report} payload - The report data object.
 *
 * @returns {Promise<ReportResponse | { error: string }>} - A promise that resolves to
 *   the created report, or an error message if the request fails.
 */
export const createReport = async (payload: Report) => {
  try {
    await httpClient.post<Report, ReportResponse>({
      endpoint: API_ENDPOINT.REPORT,
      payload: { data: payload },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

import { useMutation } from '@tanstack/react-query';

// Constants
import { API_ENDPOINT } from '@/constants';

// Interfaces
import { Order, OrderResponse } from '@/interfaces';

// Services
import { httpClient } from '@/services';

// HOCs
import { withAuth } from '@/hocs';

/**
 * Mutation hook to create an order.
 *
 * @returns A React Query mutation function that can be used to create an order.
 */
export const useCreateOrder = () =>
  useMutation<OrderResponse, string, Order>({
    mutationFn: async (payload) =>
      withAuth((token) =>
        httpClient.post({
          endpoint: API_ENDPOINT.ORDER,
          payload: { data: payload },
          token,
        }),
      ),
  });

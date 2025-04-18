import { useEffect, useState } from 'react';

// Stores
import { useAuthStore, useIniStore } from '@/stores';

/**
 * Custom hook that manages the hydration state of authentication and initialization stores.
 *
 * This hook listens for the completion of the hydration process for both the authentication
 * store and the initialization store. It sets the hydration state to true once each store
 * has completed hydration. The hook returns a boolean indicating whether both stores have
 * been fully hydrated.
 *
 * @returns {boolean} - True if both the authentication and initialization stores are hydrated,
 *   false otherwise.
 */
export const useHydration = () => {
  const [hydratedAuthStore, setHydratedAuthStore] = useState(false);
  const [hydratedInitStore, setHydratedInitStore] = useState(false);

  useEffect(() => {
    const unsubFinishHydrationAuthStore =
      useAuthStore.persist.onFinishHydration(() => {
        setHydratedAuthStore(true);
      });
    const unsubFinishHydrationInitStore = useIniStore.persist.onFinishHydration(
      () => {
        setHydratedInitStore(true);
      },
    );

    setHydratedAuthStore(useAuthStore.persist.hasHydrated());
    setHydratedInitStore(useIniStore.persist.hasHydrated());

    return () => {
      unsubFinishHydrationAuthStore();
      unsubFinishHydrationInitStore();
    };
  }, []);

  return hydratedAuthStore && hydratedInitStore;
};

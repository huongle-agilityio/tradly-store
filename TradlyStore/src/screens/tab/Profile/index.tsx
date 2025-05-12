import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Button } from '@/components/common';
import { ToggleThemeSwitch } from '@/components/shared';

// Stores
import { useAuthStore } from '@/stores';

export const Profile = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  return (
    <View style={styles.container}>
      <ToggleThemeSwitch />
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { minWidth: 330, paddingVertical: 30, alignSelf: 'center' },
});

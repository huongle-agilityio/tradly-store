import { StyleSheet, View } from 'react-native';

// Components
import { Text } from '@/ui/components';
import { FormLogin } from '@/ui/sections';

// Constants
import { BRAND } from '@/constants';

// Themes
import { colors, spacing } from '@/ui/themes';

export const Login = () => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={[{ gap: 66, marginBottom: 45 }, styles.textWrapper]}>
        <Text color="light" fontSize="xxl" fontWeight="normal">
          Welcome to {BRAND.NAME}
        </Text>
        <Text color="light" fontSize="md" fontWeight="light">
          Login to your account
        </Text>
      </View>
      <FormLogin />

      <View style={[{ gap: 45, marginTop: spacing[8] }, styles.textWrapper]}>
        <Text color="light" fontSize="lg" fontWeight="light">
          Forgot your password?
        </Text>
        <Text color="light" fontSize="lg" fontWeight="light">
          Don’t have an account?{' '}
          <Text color="light" fontSize="lg" fontWeight="medium">
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
  content: {
    width: 310,
    alignSelf: 'center',
  },
  textWrapper: {
    alignItems: 'center',
  },
});

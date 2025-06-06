import { lazy, memo, RefObject, Suspense, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

// Components
import { Form } from '../Form';
import { Text } from '@/components/common';

// Constants
import { BRAND } from '@/constants';

// Interfaces
import { AuthPayload } from '@/interfaces';

// Themes
import { spacing } from '@/themes';

const ConfirmSheet = lazy(() =>
  import('@/components/shared/ConfirmSheet').then((module) => ({
    default: module.ConfirmSheet,
  })),
);

interface ContentProps {
  isPending: boolean;
  error: string;
  sheetRef: RefObject<BottomSheetMethods | null>;
  onCloseSheet: () => void;
  onConfirmSheet: () => void;
  onSubmit: (payload: AuthPayload) => Promise<void>;
}

export const Content = memo(
  ({
    sheetRef,
    isPending,
    error,
    onSubmit,
    onCloseSheet,
    onConfirmSheet,
  }: ContentProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: colors.primary,
            justifyContent: 'center',
          },
        }),
      [colors.primary],
    );

    return (
      <View style={stylesDynamic.container}>
        <KeyboardAwareScrollView
          extraKeyboardSpace={50}
          contentContainerStyle={styles.content}
        >
          <View style={[styles.title, styles.textWrapper]}>
            <Text color="light" fontSize="xxl" fontWeight="normal">
              Welcome to {BRAND.NAME}
            </Text>
            <Text color="light" fontSize="md" fontWeight="light">
              Login to your account
            </Text>
          </View>
          <Form error={error} isLoading={isPending} onSubmit={onSubmit} />

          <View style={[styles.subtitle, styles.textWrapper]}>
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

          <Suspense fallback={null}>
            <ConfirmSheet
              title="Notifications disabled"
              description="To receive important updates, please enable notifications in your device settings."
              buttonConfirmText="Open Settings"
              backdropPress="none"
              sheetRef={sheetRef}
              onConfirm={onConfirmSheet}
              onCancel={onCloseSheet}
            />
          </Suspense>
        </KeyboardAwareScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    width: 320,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: { gap: 66, marginBottom: 45 },
  subtitle: { gap: 45, marginTop: spacing[8] },
});

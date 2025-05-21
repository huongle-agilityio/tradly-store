import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const LoadingFooter = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.loadingNextPage}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingNextPage: { marginTop: 30, marginBottom: 50 },
});

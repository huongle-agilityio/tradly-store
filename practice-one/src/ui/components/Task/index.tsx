import { StyleSheet, TextInput, View } from 'react-native';

export const Task = ({ title }: { title: string }) => {
  return (
    <View style={styles.listItem}>
      <TextInput value={title} editable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: 'blue',
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
});

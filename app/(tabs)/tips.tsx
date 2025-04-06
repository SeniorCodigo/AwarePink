import { StyleSheet, View, Text } from "react-native";

export default function Tips() {
  return (
    <View style={styles.container}>
      <Text>{`Tips`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

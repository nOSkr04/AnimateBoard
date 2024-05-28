import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { SharedValue } from "react-native-reanimated";
import { OnboardingData } from "./data";
import { Dot } from "./dot";

type Props = {
  x: SharedValue<number>;
  data: OnboardingData[];
};

const Pagination = memo(({ x, data }: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <Dot key={index} index={index} x={x} />;
      })}
    </View>
  );
});

Pagination.displayName = "Pagination";

export { Pagination };

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

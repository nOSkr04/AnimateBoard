import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import Animated, {
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  x: SharedValue<number>;
  index: number;
};

const width = Dimensions.get("window").width;

const Dot = memo(({ x, index }: Props) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [10, 20, 10]
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5]
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, width, 2 * width],
      ["#005b4f", "#1e2169", "#f15937"]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]} />
  );
});

Dot.displayName = "Dot";

export { Dot };

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

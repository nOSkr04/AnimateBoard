import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { memo, useCallback } from "react";
import { OnboardingData } from "./data";
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
type Props = {
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
  flatlistIndex: SharedValue<number>;
  dataLength: number;
  x: SharedValue<number>;
};

const width = Dimensions.get("screen").width;

const AnimatedFeather = Animated.createAnimatedComponent(Feather);

const BoardButton = memo(
  ({ flatlistIndex, flatlistRef, dataLength, x }: Props) => {
    const aniamtedColor = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        x.value,
        [0, width, 2 * width],
        ["#005b4f", "#1e2169", "#f15937"]
      );
      return { backgroundColor };
    });

    const buttonAnimationStyle = useAnimatedStyle(() => {
      return {
        width:
          flatlistIndex.value === dataLength - 1
            ? withSpring(140)
            : withSpring(60),
        height: 60,
      };
    });

    const arrowAnimationStyle = useAnimatedStyle(() => {
      return {
        width: 30,
        height: 30,
        opacity:
          flatlistIndex.value === dataLength - 1
            ? withTiming(0)
            : withTiming(1),
        transform: [
          {
            translateX:
              flatlistIndex.value === dataLength - 1
                ? withTiming(100)
                : withTiming(0),
          },
        ],
      };
    });

    const textAnimationStyle = useAnimatedStyle(() => {
      return {
        opacity:
          flatlistIndex.value === dataLength - 1
            ? withTiming(1)
            : withTiming(0),
        transform: [
          {
            translateX:
              flatlistIndex.value === dataLength - 1
                ? withTiming(0)
                : withTiming(-100),
          },
        ],
      };
    });

    const handlePress = useCallback(() => {
      if (flatlistIndex.value < dataLength - 1) {
        flatlistRef.current?.scrollToIndex({
          index: flatlistIndex.value + 1,
          animated: true,
        });
        flatlistIndex.value = 0;
      } else {
        console.log("object");
      }
    }, []);
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View
          style={[styles.container, aniamtedColor, buttonAnimationStyle]}
        >
          <Animated.Text style={[styles.textButton, textAnimationStyle]}>
            Get Started
          </Animated.Text>
          <AnimatedFeather
            name="arrow-right"
            size={30}
            color="white"
            style={[styles.arrow, arrowAnimationStyle]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
);

BoardButton.displayName = "BoardButton";

export { BoardButton };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 60,
    height: 60,
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    position: "absolute",
  },
});

import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("./1.json"),
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    id: 2,
    animation: require("./2.json"),
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 3,
    animation: require("./3.json"),
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    textColor: "#f15937",
    backgroundColor: "#faeb8a",
  },
];

export { data };

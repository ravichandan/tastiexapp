// shared/SmoothText.tsx
// import {React} from "react";
import { Text, TextProps, StyleSheet } from "react-native";

export default function SmoothText({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.text, style]} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "OpenSans-Regular",
    includeFontPadding: false,
    letterSpacing: 0.2,
  },
});

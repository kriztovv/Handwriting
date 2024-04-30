import React, { useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";

const DrawingBoard = () => {
  const [lines, setLines] = useState([]);

  const handlePanResponderMove = (event, gestureState) => {
    const { locationX, locationY } = gestureState;
    setLines([...lines, { x: locationX, y: locationY }]);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <View style={styles.whiteBox} {...panResponder.panHandlers}>
          {lines.map((line, index) => (
            <View
              key={index}
              style={[styles.line, { left: line.x, top: line.y }]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boardContainer: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    overflow: "hidden",
  },
  whiteBox: {
    width: width - 40,
    height: height / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    width: 5,
    height: 5,
    backgroundColor: "black",
    borderRadius: 5 / 2,
  },
});

export default DrawingBoard;

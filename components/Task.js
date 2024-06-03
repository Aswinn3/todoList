import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';

const Task = (props) => {
  const [isChecked, setChecked] = useState(props.completed);

  const handlePress = () => {
    setChecked(!isChecked);
    props.onPress();
  };

  return (
    <View style={isChecked ? styles.itemCompleted : styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={handlePress}/>
        </TouchableOpacity>
        <Text 
          style={isChecked ? styles.itemRightCompleted : styles.itemRight} 
          onPress={handlePress}
        > 
          {props.text}
        </Text>
      </View>
      <MaterialIcons name="delete" size={20} color="grey" onPress={props.deleteTask}/>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#5AB2FF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemCompleted: {
    backgroundColor: "#CAF4FF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginRight: 15,
  },
  itemRight: {
    maxWidth: "80%",
  },
  itemRightCompleted: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
});

export default Task;

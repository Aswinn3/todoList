import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';

const Task = ({ text, completed, onPress, deleteTask }) => {
  const [isChecked, setChecked] = useState(completed);

  const handlePress = () => {
    setChecked(!isChecked);
    onPress();
  };

  return (
    <View style={isChecked ? styles.itemCompleted : styles.item}>
      <View style={styles.itemLeft}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={handlePress}/>
        <Text style={isChecked ? styles.itemTextCompleted : styles.itemText}>{text}</Text>
      </View>
      <MaterialIcons name="delete" size={24} color="grey" onPress={deleteTask} />
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
  },
  checkbox: {
    marginRight: 15,
    backgroundColor: "#FEFFDF",
  },
  itemText: {
    maxWidth: "80%",
  },
  itemTextCompleted: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
  },
});

export default Task;

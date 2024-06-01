import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';


const Task = (props) => {
  const [isChecked, setChecked] = useState(props.complated);

  const handlePress = () => {
    setChecked(!isChecked);
    props.onPress();
  };

  return (
    <View>
      {props.complated ? (
        <View style={styles.itemComplated}>
          <View style={styles.itemLeft}>
            <TouchableOpacity onPress={handlePress}><Checkbox style={styles.checkbox} value={isChecked} onValueChange={handlePress} /></TouchableOpacity>
            {props.complated ? (
              <Text style={styles.itemRightComplated}>{props.text}</Text>
            ) : (
              <Text style={styles.itemRight}>{props.text}</Text>
            )}
          </View>
          <MaterialIcons name="delete" size={20} color="grey" onPress={props.deleteTask}/>
        </View>
      ) : (
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <TouchableOpacity onPress={handlePress}><Checkbox style={styles.checkbox} value={isChecked} onValueChange={handlePress} /></TouchableOpacity>
            {props.complated ? (
              <Text style={styles.itemRightComplated}>{props.text}</Text>
            ) : (
              <Text style={styles.itemRight}>{props.text}</Text>
            )}
          </View>
          <MaterialIcons name="delete" size={20} color="grey" onPress={props.deleteTask}/>
        </View>
      )}
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
  itemComplated: {
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
  text: {
    maxWidth: "80%",
  },
  itemRight: {
    maxWidth: "80%",
  },
  itemRightComplated: {
    maxWidth: "80%",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
});

export default Task;

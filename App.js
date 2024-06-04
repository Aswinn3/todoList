import React, { useState, useEffect } from "react";
import { Platform, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(taskItems);
  }, [taskItems]);

  const saveTasks = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', jsonTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTasks = async () => {
    try {
      const jsonTasks = await AsyncStorage.getItem('tasks');
      if (jsonTasks != null) {
        setTaskItems(JSON.parse(jsonTasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = () => {
    if (task.trim()) {
      setTaskItems([...taskItems, { text: task, completed: false }]);
      setTask("");
      Keyboard.dismiss();
    }
  };

  const completeTask = (index) => {
    const itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy);
  };

  const deleteTask = (index) => {
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/navIcon.png")} style={styles.headerIcon} />
        <Text style={styles.sectionTitle}>Task Manager</Text>
      </View>
      <ScrollView style={styles.tasksWrapper}>
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <Task
              key={index}
              text={item.text}
              completed={item.completed}
              onPress={() => completeTask(index)}
              deleteTask={() => deleteTask(index)}
            />
          ))}
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF7FF",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5AB2FF",
    width: "100%",
    height: 80,
    justifyContent: "center",
    paddingRight: 100,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: "#C0C0C0",
  },
});

import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

// Define the Task interface
interface Task {
  _id: string;
  name: string;
  priority: number; // Priority between 1 and mockTasks.length (5)
}

// Mock data with 5 tasks having unique priorities, names, and IDs
const mockTasks: Task[] = [
  {
    _id: "task_001",
    name: "Complete project documentation",
    priority: 4,
  },
  {
    _id: "task_002",
    name: "Fix authentication bug",
    priority: 5,
  },
  {
    _id: "task_003",
    name: "Update dependencies",
    priority: 1,
  },
  {
    _id: "task_004",
    name: "Code review for new feature",
    priority: 2,
  },
  {
    _id: "task_005",
    name: "Deploy to production",
    priority: 3,
  },
];

// Function to get priority badge color (all red)
const getPriorityColor = (priority: Task["priority"]) => {
  return "#dc3545"; // Red background for all priorities
};

// Task item component for draggable list
const TaskItem = ({ item: task, drag, isActive }: RenderItemParams<Task>) => (
  <ScaleDecorator>
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={{ opacity: isActive ? 0.8 : 1 }}
    >
      <ThemedView style={styles.taskItem}>
        <View style={styles.taskContent}>
          <ThemedText type="defaultSemiBold" style={styles.taskName}>
            {task.name}
          </ThemedText>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(task.priority) },
            ]}
          >
            <ThemedText style={styles.priorityText}>{task.priority}</ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  </ScaleDecorator>
);

// Main DataSort component
export function DataSort() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleDragEnd = ({ data }: { data: Task[] }) => {
    // Update priorities based on new positions (1-based)
    const updatedTasks = data.map((task, index) => ({
      ...task,
      priority: index + 1,
    }));
    setTasks(updatedTasks);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Task List (Drag to Reorder)
      </ThemedText>
      <DraggableFlatList
        data={tasks}
        onDragEnd={handleDragEnd}
        keyExtractor={(item) => item._id}
        renderItem={(params) => <TaskItem {...params} />}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

// Function to get mock tasks (can be used externally)
export const getMockTasks = (): Task[] => {
  return mockTasks;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  taskItem: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  taskContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  taskName: {
    flex: 1,
    marginRight: 12,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 70,
    alignItems: "center",
  },
  priorityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

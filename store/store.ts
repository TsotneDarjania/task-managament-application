"use client";
import { types, applySnapshot } from "mobx-state-tree";

export const Task = types
  .model("Task", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title;
    },
    setDescription(description: string) {
      self.description = description;
    },
    setStatus(status: string) {
      self.status = status;
    },
  }));

const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
  })
  .actions((self) => {
    const storeTasksToLocalStorage = () => {
      try {
        const tasksJson = JSON.stringify(self.tasks);
        localStorage.setItem("tasks", tasksJson);
      } catch (error) {
        console.error("Error storing tasks to local storage:", error);
      }
    };

    const loadTasksFromLocalStorage = () => {
      try {
        const tasksJson = localStorage.getItem("tasks");
        if (tasksJson) {
          const parsedTasks = JSON.parse(tasksJson);
          self.tasks.replace(
            parsedTasks.filter(
              (task: any) => !self.tasks.find((t: any) => t.id === task.id)
            )
          ); // Filter out already existing tasks
        }
      } catch (error) {
        console.error("Error parsing tasks from local storage:", error);
      }
    };

    return {
      addTask(task: typeof Task.Type) {
        self.tasks.push(task);
        storeTasksToLocalStorage();
      },
      editTask(taskId: string, updatedTask: typeof Task.Type) {
        const task = self.tasks.find((t) => t.id === taskId);
        if (task) {
          applySnapshot(task, updatedTask);
          storeTasksToLocalStorage();
        }
      },
      deleteTask(taskId: string) {
        const taskIndex = self.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          self.tasks.splice(taskIndex, 1);
          storeTasksToLocalStorage();
        }
      },
      loadTasksFromLocalStorage,
      storeTasksToLocalStorage,
    };
  });

export default TaskStore;

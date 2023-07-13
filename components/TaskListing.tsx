"use client";
import { useStore } from "@/store/context";
import { useEffect } from "react";
import Tasks from "./Tasks";
import { observer } from "mobx-react-lite";

export interface UpdatedTask {
  id: string;
  title: string;
  description: string;
  status: string;
  setTitle(title: string): void;
  setDescription(description: string): void;
  setStatus(status: string): void;
}

const TaskListing = observer(() => {
  const { taskStore } = useStore();

  const handleEditTask = (
    taskId: string,
    updatedTask: UpdatedTask & {
      setTitle(title: string): void;
      setDescription(description: string): void;
      setStatus(status: string): void;
    }
  ) => {
    taskStore.editTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    taskStore.deleteTask(taskId);
  };

  const renderTasksByStatus = (status: string) => {
    const tasks = taskStore.tasks.filter((task) => task.status === status);

    return (
      <div className='bg-[#b4b4b467] p-5 w-full rounded-lg' key={status}>
        <h2 className='mb-5 font-semibold'>{status}</h2>
        <div>
          {tasks.map((task) => (
            <Tasks
              key={task.id}
              task={task}
              onTaskEdit={handleEditTask}
              onTaskDelete={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='mb-10'>
      <h2 className='text-xl mt-10 border-b-4 border-teal-700 pb-2 mb-10 font-medium text-teal-700'>
        Lets Doo..! These Tasks
      </h2>
      <div className='flex flex-col md:flex-row gap-10 justify-between w-full'>
        <div className='bg-[#b4b4b467] p-5 w-full rounded-lg'>
          <h2 className='mb-5 font-semibold'>To Do</h2>
          <div>
            {taskStore.tasks
              .filter((task) => task.status === "To Do's")
              .map((task) => (
                <Tasks
                  key={task.id}
                  task={task}
                  onTaskEdit={taskStore.editTask}
                  onTaskDelete={taskStore.deleteTask}
                />
              ))}
          </div>
        </div>
        <div className='bg-[#b4b4b467] p-5 w-full rounded-lg'>
          <h2 className='mb-5 font-semibold'>In Progress</h2>
          <div>
            {taskStore.tasks
              .filter((task) => task.status === "In Progress")
              .map((task) => (
                <Tasks
                  key={task.id}
                  task={task}
                  onTaskEdit={taskStore.editTask}
                  onTaskDelete={taskStore.deleteTask}
                />
              ))}
          </div>
        </div>
        <div className='bg-[#b4b4b467] p-5 w-full rounded-lg'>
          <h2 className='mb-5 font-semibold'>Completed</h2>
          <div>
            {taskStore.tasks
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <Tasks
                  key={task.id}
                  task={task}
                  onTaskEdit={taskStore.editTask}
                  onTaskDelete={taskStore.deleteTask}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TaskListing;

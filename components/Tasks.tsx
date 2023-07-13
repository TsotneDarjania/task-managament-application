"use client";
import { useState } from "react";
import { UpdatedTask } from "./TaskListing";
import { observer } from "mobx-react-lite";

interface TasksProps {
  task: any;
  onTaskEdit: (
    taskId: string,
    updatedTask: UpdatedTask & {
      setTitle(title: string): any;
      setDescription(description: string): void;
      setStatus(status: string): void;
    }
  ) => void;
  onTaskDelete: (taskId: string) => void;
}

const Tasks = observer(({ task, onTaskEdit, onTaskDelete }: TasksProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description
  );
  const [updatedStatus, setUpdatedStatus] = useState(task.status);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: UpdatedTask & {
      setTitle(title: string): void;
      setDescription(description: string): void;
      setStatus(status: string): void;
    } = {
      id: task.id,
      title: updatedTitle,
      description: updatedDescription,
      status: updatedStatus,
      setTitle: (title: string) => {
        setUpdatedTitle(title);
      },
      setDescription: (description: string) => {
        setUpdatedDescription(description);
      },
      setStatus: (status: string) => {
        setUpdatedStatus(status);
      },
    };
    onTaskEdit(task.id, updatedTask);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedStatus(task.status);

    setIsEditing(false);
  };

  const handleDelete = () => {
    onTaskDelete(task.id);
  };

  return (
    <div className='bg-white shadow-md p-5 rounded-lg mb-6'>
      <div>
        <h3 className='text-xl font-semibold'>{task.title}</h3>
        <p className='text-gray-500'>{task.description}</p>
        <div className='flex gap-2 mt-10'>
          <div>
            <button
              className='bg-teal-700 px-3 rounded-md font-semibold text-white py-1 hover:bg-teal-900 duration-200 transition-all ease-linear'
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
          <div>
            <button
              className=' py-1 px-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-800 duration-200 transition-all ease-linear'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className='fixed top-0 bottom-0 grid place-content-center left-0 right-0 bg-black/10 backdrop-blur-sm'>
          <form
            onSubmit={handleSave}
            className='flex flex-col justify-between max-w-md h-[400px] bg-[#fafafa] p-5 shadow lg rounded-lg'
          >
            <div className='flex flex-col gap-2'>
              <h2 className='text-center mb-5'>Edit Task</h2>
              <label className='text-base font-medium text-teal-800'>
                Title
              </label>
              <input
                className=' border border-teal-500 focus:outline-none focus:teal-800 focus:ring-1  py-2 rounded-sm px-3'
                type='text'
                placeholder='Title'
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <label className='text-base font-medium text-teal-800'>
                Description
              </label>

              <input
                className=' border border-teal-500 focus:outline-none focus:teal-800 focus:ring-1  py-2 rounded-sm px-3'
                type='text'
                placeholder='Description'
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <label className='text-base font-medium text-teal-800'>
                Status
              </label>

              <select
                className=' border border-teal-500 focus:outline-none focus:teal-800 focus:ring-1  py-2 rounded-sm px-3'
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value='To Do'>To Do's</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
            </div>
            <div className='flex items-center justify-start gap-5'>
              <div>
                <button
                  type='submit'
                  className='bg-teal-700 px-3 rounded-md font-semibold text-white py-1 hover:bg-teal-900 duration-200 transition-all ease-linear'
                >
                  Done
                </button>
              </div>
              <div>
                <button
                  onClick={handleCancel}
                  className=' py-1 px-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-800 duration-200 transition-all ease-linear'
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
});

export default Tasks;

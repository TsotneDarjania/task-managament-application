"use client";

import Form from "@/components/Form";
import TaskListing from "@/components/TaskListing";
import { storeContext } from "@/store/context";
import TaskStore from "@/store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { autorun } from "mobx";
import { useLocalObservable, observer } from "mobx-react-lite";
import React, { useEffect } from "react";

const Home = observer(() => {
  const store = useLocalObservable(() => ({
    taskStore: TaskStore.create({
      tasks: [],
    }),
  }));

  const tasksLoadedFromLocalStorage = React.useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !tasksLoadedFromLocalStorage.current) {
      const tasksFromLocalStorage = localStorage.getItem("tasks");
      if (tasksFromLocalStorage) {
        const parsedTasks = JSON.parse(tasksFromLocalStorage);
        parsedTasks.forEach((task: any) => {
          store.taskStore.addTask(task);
        });
      }
      tasksLoadedFromLocalStorage.current = true;
    }
  }, [store.taskStore]);
  return (
    <>
      <storeContext.Provider value={store}>
        <ChakraProvider>
          <div className='bg-teal-50 h-screen'>
            <div className='max-w-[1300px]  mx-auto py-10 px-5 lg:px-10'>
              <h1 className='font-bold text-center text-3xl mb-10 uppercase text-teal-800'>
                Task Management Application
              </h1>
              <div>
                <Form />
                <TaskListing />
              </div>
            </div>
          </div>
        </ChakraProvider>
      </storeContext.Provider>
    </>
  );
});

export default Home;

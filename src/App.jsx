import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Tasks from './components/Tasks';
import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";

const App = () => {
const [tasks, setTasks] = useState([
    {
      id: '1',
      title: "Estudar programação",
      completed: false,
    },
    {
      id: '2',
      title: "Ler Livros",
      completed: true,
    },
  ]);

  const handleTaskClick = (taskId) =>{
    const newTasks = tasks.map(task =>{
      if(task.id == taskId)return{...task, completed: !task.completed}

      return task;
    });

    setTasks(newTasks);
  }

  const handleTaskAddition = (taskTitle) =>{
    const newTasks = [... tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }];

    setTasks(newTasks);
  }

  const handleTaskDelete = (TaskId) =>{
    const removeTask = tasks.filter(task =>{return (task.id != TaskId)});
    
    setTasks(removeTask);
  }

  return (
    <Router>
        <div className="container"> 
            <Header /> 
            <Route 
              path="/learn-react/" 
              exact 
              render={() =>(
                <>
                  <AddTask handleTaskAddition={handleTaskAddition} />
                  <Tasks 
                  tasks={tasks} 
                  handleTaskClick={handleTaskClick}
                  handleTaskDelete={handleTaskDelete}
                  />
                </>
              )}
            />
            <Route path="/learn-react/:taskTitle" exact component={TaskDetails}/>
        </div>
    </Router>
  );
};

export default App;
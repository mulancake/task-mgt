import { useState, useRef } from 'react'
import tmlogo from './assets/tmlogo.avif'
import './App.css'

import Header from './components/Header.jsx'
import TaskModal from './components/TaskModal.jsx'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState(["All", "Active", "Completed"][0])  // default to "All"
  const [selectedTask, setSelectedTask] = useState(null)  // for editing;
  const nextId = useRef(1)   

  const filteredTasks = filter === "All"
    ? tasks
    : tasks.filter((t) => t.status === filter)

  const selectedTaskData = selectedTask?.id ? tasks.find((t) => t.id === selectedTask.id) : null

  const handleAddTask = (taskData) => {
    const newTask = {
      id: nextId.current++,
      title: taskData.title.trim(),
      description: taskData.description || "",
      status: taskData.status || "Active",
    }
    setTasks([...tasks, newTask])  // add to list
    setModalOpen(false)
  }

  const handleEditTask = (id, updatedData) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedData } : t)))
    setModalOpen(false)
    setSelectedTask(null) 
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleCompleteTask = (id) => {
    setTasks(prev => prev.map((t) => t.id === id ? { ...t, status: "Completed" } : t))
  }

  const handleIncompleteTask = (id) => {
    setTasks(prev => prev.map((t) => t.id === id ? { ...t, status: "Active" } : t))
  }

  // const handleCompleteTask = (id) => {
  //   filteredTasks.filter((task) => task.id === id).forEach((task) => {
  //     if (task.status === "Active") {
  //       setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "Completed" } : t)))
  //     }
  //   })
  // }

  // const handleIncompleteTask = (id) => {
  //   filteredTasks.filter((task) => task.id === id).forEach((task) => {
  //     if (task.status === "Completed") {
  //       setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "Active" } : t)))
  //     }
  //   })
  // }


  return (
    <>  
      <div className="app">
        <section className="container">
          <div className="image-header">
            <img src={tmlogo} className="base" width="170" height="179" alt="" />
          </div>
          <div>
              <Header 
                onNewTask={() => {
                  setSelectedTask(null)
                  setModalOpen(true)
                }}
                onEditTask={(task) => {
                  setSelectedTask(task)
                  setModalOpen(true)
                }} 
                onChange={setFilter}
                value={filter}
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onComplete={handleCompleteTask}
                onIncomplete={handleIncompleteTask}
              />

              {modalOpen && (
                <TaskModal
                  onClose={() => setModalOpen(false)}
                  onSubmit={handleAddTask}
                  onEdit={selectedTaskData ? (updatedData) => handleEditTask(selectedTaskData.id, updatedData) : null}
                  task={selectedTaskData}
                />
              )}
          </div>
        </section>
      </div>
    </>
  )
}
export default App

import { useState } from "react";

import Header from "./components/Header";
import TodoList, { Todo } from "./components/TodoList";

import './global.css'

export default function App() {
  const [tasks, setTasks] = useState<Todo[]>([])

  return (
    <div>
      <Header setTasks={setTasks} />
      <TodoList tasks={tasks} />
    </div>
  )
}

import './App.css';
import TaskGroup from './components/TaskGroup'
import {CardGroup} from 'react-bootstrap'
function App() {
  return (
    <CardGroup>
    <TaskGroup tasks={["Task 1", "Task 2", "Task 3"]} subtitle="Work in progress to be completed" title = "To-Do"></TaskGroup>
    <TaskGroup tasks={["Task 1", "Task 2", "Task 3"]} subtitle="Work in progress currently on-hold" title = "On-Hold"></TaskGroup>
    <TaskGroup tasks={["Task 1", "Task 2", "Task 3"]} subtitle="Work that has been completed" title = "Completed"></TaskGroup>
    </CardGroup>
  )
}

export default App;

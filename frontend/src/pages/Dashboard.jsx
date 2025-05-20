import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
    subscribeToTasks()
  }, [])

  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*')
    setTasks(data)
  }

  const subscribeToTasks = () => {
    supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        (payload) => {
          console.log('Change received!', payload.new)
          fetchTasks()
        }
      )
      .subscribe()
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <TaskForm onTaskCreated={fetchTasks} />
      <TaskList tasks={tasks} />
    </div>
  )
}
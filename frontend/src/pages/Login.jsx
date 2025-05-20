import { supabase } from '../utils/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'user@example.com',
      password: 'password'
    })

    if (!error) navigate('/dashboard')
    else alert(error.message)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={signIn} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign In with Email
      </button>
    </div>
  )
}
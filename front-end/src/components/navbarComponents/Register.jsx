import { useState } from "react"
import { useRegister } from "../../hooks/useRegister"

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [program, setProgram] = useState('')
  const [password, setPassword] = useState('')
  const {register, error, isLoading} = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await register(username, email, program, password)
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>
      
      <label>Username:</label>
      <input 
        type="username" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Program:</label>
      <input 
        type="program" 
        onChange={(e) => setProgram(e.target.value)} 
        value={program} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Register
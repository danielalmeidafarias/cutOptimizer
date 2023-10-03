import Button from "./components/Button"
import Input from "./components/Input"
import NavBar from "./components/NavBar"
import LoginPage from "./routes/LoginPage"
import { useState } from "react"


function App() {

  const [userId, setUserId] = useState(sessionStorage.getItem('userId'))


  return (
    <>
      {userId ? (
        <div>
          <NavBar />

        </div>
      ) : (
        <LoginPage />
      )}
    </>
  )
}

export default App

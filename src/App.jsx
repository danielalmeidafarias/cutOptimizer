import Button from "./components/Button"
import Input from "./components/Input"
import NavBar from "./components/NavBar"


function App() {

  return (
    <>
      <NavBar />
      <h1 className="text-xl bg-red-500">Olá</h1>
      <div>
        <Button />
        <Input />
      </div>
    </>
  )
}

export default App

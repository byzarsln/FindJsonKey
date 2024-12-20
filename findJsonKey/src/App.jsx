import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [inputValue, setInputValue] = useState("")
  const [jsonValue, setJsonValue] = useState(null)
  const [textAreaValue, setTextAreaValue] = useState("")

  const findValue = async () => {
    try {
      const response = await axios.get("/pet3.json")
      setJsonValue(response.data);

    } catch (error) {
      console.error("Error")
    }
  }

  useEffect(() => {
    findValue()
  }, [])

  const handleInput = (e) => {
    e.preventDefault();
    const result = inputValue.split(".").reduce((acc, key) => acc[key], jsonValue)
    setTextAreaValue(JSON.stringify(result, null, 2))
  }

  return (  
    <div>
      <form onSubmit={handleInput} className='area'>
        <div className='inputArea'>
          <label>Input</label>
          <input type="text"
          value={inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
          placeholder='exp: components.securitySchemes.petstore_auth'/>
        </div>
        <div className='button'>
          <label>Submit Form</label>
          <button type='submit'>run</button>
        </div>
      </form>
      <div className='textArea'>
        <label>Text Area</label>
        <textarea value={textAreaValue} readOnly cols="80" rows="25"></textarea>
      </div>
    </div>
  )
}

export default App
